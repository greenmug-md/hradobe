import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import SocketClient from "socket.io-client";
import Hash from "../../../utils/Hash";

/**
 * View modes
 */
export const VIEW_MODE = {
	FULL_WINDOW: "FULL_WINDOW",
	SIZED_CONTAINER: "SIZED_CONTAINER",
	IN_LINE: "IN_LINE",
	LIGHT_BOX: "LIGHT_BOX"
}

/**
 * Document events
 */
export const EVENTS = {
	CURRENT_PAGE: "CURRENT_PAGE",
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	TEXT_SEARCH: "TEXT_SEARCH",
	TEXT_COPY: "TEXT_COPY",
	HYPERLINK_OPEN: "HYPERLINK_OPEN",
	PRINT: "PRINT",
	DOWNLOAD: "DOWNLOAD",
	TIME_IN_DOCUMENT: "TIME_IN_DOCUMENT",
	TIME_IN_PAGE: "TIME_IN_PAGE"
}

/**
 * Translations from adobe document events
 */
const ADOBE_EVENTS_TRANSLATIONS = {
	CURRENT_ACTIVE_PAGE: "CURRENT_PAGE",
	PDF_VIEWER_OPEN: "OPEN",
	PDF_VIEWER_CLOSE: "CLOSE",
	TEXT_SEARCH: "TEXT_SEARCH",
	TEXT_COPY: "TEXT_COPY",
	HYPERLINK_OPEN: "HYPERLINK_OPEN",
	DOCUMENT_PRINT: "PRINT",
	DOCUMENT_DOWNLOAD: "DOWNLOAD",
}

/**
 * Events generated for annotation management
 */
const ANNOTATION_EVENTS = {
	ANNOTATION_ADDED: "ANNOTATION_ADDED",
	ANNOTATION_UPDATED: "ANNOTATION_UPDATED",
	ANNOTATION_DELETED: "ANNOTATION_DELETED",
}

/**
 * Get local event data model from adobe event
 * @param {Object} adobeEvent The adobe event
 * @returns {EventData} The resulting event data
 */
let getEventDataFromAdobeEvent = (adobeEvent) => {
	let localEvent = ADOBE_EVENTS_TRANSLATIONS[adobeEvent.type]

	if (!localEvent)
		throw new Error(
			`${adobeEvent.type} event invalid, should be: ${Object.keys(ADOBE_EVENTS_TRANSLATIONS)}`
		)

	switch (localEvent) {
		case EVENTS.CURRENT_PAGE:
			return { event: EVENTS.CURRENT_PAGE, value: adobeEvent.data.pageNumber }

		case EVENTS.TEXT_SEARCH:
			return { event: EVENTS.TEXT_SEARCH, value: adobeEvent.data.searchedText }

		case EVENTS.TEXT_COPY:
			return { event: EVENTS.TEXT_COPY, value: adobeEvent.data.copiedText }

		case EVENTS.HYPERLINK_OPEN:
			return { event: EVENTS.HYPERLINK_OPEN, value: adobeEvent.data.url }

		default:
			return { event: localEvent }
	}
}

let startAdobeDCView = (idContainer, onEvent, username) => {
	let onAdobeDocumentEvent = (adobeEvent) => {
		let isEventToListen = Object.keys(ADOBE_EVENTS_TRANSLATIONS).includes(adobeEvent.type)

		if (isEventToListen)
			onEvent(getEventDataFromAdobeEvent(adobeEvent))
	}

	let startConfig = {
		clientId: "c4d7e6e46b2a46b99a66a3a3fa824b9d",
		divId: idContainer
	}

	let adobeDCView = new window.AdobeDC.View(startConfig);

	let DEFAULT_CALLBACK_CONFIG = {
		listenOn: [],
		enableFilePreviewEvents: true,
		enablePDFAnalytics: true
	}

	const profile = {
		userProfile: {
			name: username,
			firstName: "",
			lastName: "",
			email: "",
		}
	};

	adobeDCView.registerCallback(
		window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
		(adobeEvent) => onAdobeDocumentEvent(adobeEvent),
		DEFAULT_CALLBACK_CONFIG
	)

	adobeDCView.registerCallback(
		window.AdobeDC.View.Enum.CallbackType.GET_USER_PROFILE_API,
		function () {
			return new Promise((resolve, reject) => {
				resolve({
					code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
					data: profile
				})
			})
		}
	)

	return adobeDCView
}

let PDFViewer = (props) => {
	let {
		fileId,
		username,
		fileName,
		url,
		viewMode,
		previewOptions,
		onEvent,
		onAnnotationEvent,
		...otherProps
	} = props

	let containerIDRef = useRef(`viewer-${Hash.getRandomHash()}`)
	let adobeDCViewRef = useRef(null)
	let annotationManagerRef = useRef(null)
	let socketClientRef = useRef(null)
	let theLastAnnotationWasUpdatedFromSerever = useRef(false)

	useEffect(() => {
		socketClientRef.current = SocketClient(process.env.REACT_APP_BACKEND_BASE_URL)
		return () => {
			socketClientRef.current.close()
		}
	}, [])

	useEffect(() => {
		if(!fileId) return;

		async function annotationAlreadyExist(annotation) {
			try {
				let annotations = await annotationManagerRef.current.getAnnotations({
					annotationIds: [annotation.id]
				})

				return annotations.length !== 0
			} catch (error) {
				console.log(error);
			}
		}

		async function addAnnotationToPDF(annotation) {
			console.log(annotation)
			try {
				if (!(await annotationAlreadyExist(annotation))) {
					await annotationManagerRef.current.addAnnotations([annotation])
				}
			} catch (error) {
				console.log(error);
			}
		}

		async function removeAnnotationInPDF(annotation) {
			try {
				if (await annotationAlreadyExist(annotation)) {
					await annotationManagerRef.current.deleteAnnotations({
						annotationIds: [annotation.id]
					})
				}
			} catch (error) {
				console.log(error);
			}
		}

		async function updateAnnotationInPDF(annotation) {
			try {
				if (await annotationAlreadyExist(annotation)) {
					theLastAnnotationWasUpdatedFromSerever.current = true

					await annotationManagerRef.current.updateAnnotation(annotation)
				}
			} catch (error) {
				console.log(error);
			}
		}

		socketClientRef.current.on(ANNOTATION_EVENTS.ANNOTATION_ADDED, (eventData) => {
			 console.log("amherer");
			if (eventData.fileId === fileId && annotationManagerRef.current) {
				addAnnotationToPDF(eventData.data)
			}
		})

		socketClientRef.current.on(ANNOTATION_EVENTS.ANNOTATION_UPDATED, (eventData) => {
			if (eventData.fileId === fileId && annotationManagerRef.current) {
				updateAnnotationInPDF(eventData.data)
			}
		})

		socketClientRef.current.on(ANNOTATION_EVENTS.ANNOTATION_DELETED, (eventData) => {
			if (eventData.fileId === fileId && annotationManagerRef.current) {
				removeAnnotationInPDF(eventData.data)
			}
		})
	}, [fileId])

	useEffect(() => {
		async function startAdobeDCViewAndShowFile() {
			try {
				adobeDCViewRef.current = startAdobeDCView(containerIDRef.current, onEvent, username)

				let documentData = {
					content: { location: { url: url } },
					metaData: { fileName: fileName, id: fileId || "default_id" },
				}

				let viewerOptions = {
					embedMode: viewMode,
					enableAnnotationAPIs: true,
					defaultViewMode: "FIT_WIDTH",
					annotationUIConfig: {
						downloadWithAnnotations: true
					},
					...previewOptions
				}

				let eventOptions = {
					listenOn: Object.values(ANNOTATION_EVENTS)
				}

				let adobeViewer = await adobeDCViewRef.current.previewFile(documentData, viewerOptions);

				annotationManagerRef.current = await adobeViewer.getAnnotationManager()

				annotationManagerRef.current.registerEventListener(
					(eventData) => {
						onAnnotationEvent(eventData)

						if (!socketClientRef.current) return;

						if (theLastAnnotationWasUpdatedFromSerever.current === true) {
							theLastAnnotationWasUpdatedFromSerever.current = false
							return
						}

						socketClientRef.current.emit(
							eventData.type,
							{
								fileId: fileId,
								data: eventData.data
							}
						)
					},
					eventOptions
				)
			} catch (error) {
				console.log(error);
			}
		}

		startAdobeDCViewAndShowFile()
	}, [url, username, fileId, fileName, viewMode, previewOptions, onEvent, onAnnotationEvent])

	return <div id={containerIDRef.current} {...otherProps}></div>
}

PDFViewer.propTypes = {
	/**
	 * If the fileId is provided then the viewer
	 * manage the annotation sharing connecting
	 * to server websocket
	 */
	fileId: PropTypes.string,
	username: PropTypes.string,
	fileName: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	viewMode: PropTypes.oneOf(Object.keys(VIEW_MODE)),
	/**
	 * Options to customize document viewer
	 */
	previewOptions: PropTypes.shape({
		enableFormFilling: PropTypes.bool,
		showAnnotationTools: PropTypes.bool,
		showLeftHandPanel: PropTypes.bool,
		showDisabledSaveButton: PropTypes.bool
	}),
	onEvent: PropTypes.func,
	onAnnotationEvent: PropTypes.func
}

PDFViewer.defaultProps = {
	fileId: null,
	username: "GUEST",
	viewMode: VIEW_MODE.SIZED_CONTAINER,
	previewOptions: {},
	onEvent: (eventData) => { },
	onAnnotationEvent: (eventData) => { }
}

export default PDFViewer