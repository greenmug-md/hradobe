import {
	AppBar,
	Card,
	Dialog, IconButton, Toolbar,
	useMediaQuery,
	useTheme
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import SplitterLayout from "react-splitter-layout";
import 'react-splitter-layout/lib/index.css';
import Analytics from "../../analytics/Analytics";
import Contract from "../../api/Contract";
import Loading from "../../components/Loading";
import PDFViewer from "../../components/viewers/PDFViewer";
import Session from "../../utils/Session";



let pdfViewerProps = {
	style: { height: "100%" },
	viewMode: "FULL_WINDOW",
	previewOptions: {
		showLeftHandPanel: false
	}
}

function PDFView(props) {
	let {
		...otherProps
	} = props
  let location = useLocation();
	const theme = useTheme()
	const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

	let [whiteboardIsShown, setWhiteboardIsShown] = useState(false)
  let [id, setId] =  useState(location.id)
  let [filename, setFileName] =  useState(location.filename)
	let [resource, setResource] = useState(null)
	let [draggingDivider, setDraggingDivider] = useState(false)
	let rightContainerRef = useRef(null)

	useEffect(() => {
		async function loadResource() {
			try {
				let resource = await Contract.getById(id)
				setResource(resource)
			} catch (error) {
				console.log(error);
			}
		}

		loadResource()
	}, [id])

	let onEventInViewer = useCallback((eventData) => {
		if (eventData.event === "DOWNLOAD") {
			Analytics.sendEvent({
				action: "DOWNLOAD",
				category: sessionStorage.getItem("analytics:nameCurrentClassSelected") || "NONE",
				label: "ANNOTATIONS"
			})
		}
	}, [])

	let onAnnotationEventInViewer = useCallback((eventData) => {
		if (eventData.type === "ANNOTATION_ADDED") {
			Analytics.sendEvent({
				action: "ANNOTATION_ADDED",
				category: resource.name,
				label: sessionStorage.getItem("analytics:nameCurrentClassSelected") || "NONE",
			})

			Analytics.sendEvent({
				action: "ANNOTATION_ADDED",
				category: resource.name
			})
		}
	}, [resource])

	let onStartDragInDivider = (event) => {
		setDraggingDivider(true)
	}

	let onEndDragInDivider = (event) => {
		setDraggingDivider(false)
	}

	let onClickInWhiteboardButton = () => {
		setWhiteboardIsShown(!whiteboardIsShown)
	}

	let onCloseWhiteboardDialog = () => {
		setWhiteboardIsShown(false)
	}

 
	if (!resource) {
		return <Loading loading style={{ width: "100%", height: "100%" }} />
	}

 

	let pdfViewer = (
		<PDFViewer
			fileId={resource.id}
			username={Session.getData().username}
			fileName={resource.filename}
			url={`http://localhost:4000/public/notes/${filename}`}
			{...pdfViewerProps}
			style={{
				display: draggingDivider ? "none" : "block"
			}}
			onAnnotationEvent={onAnnotationEventInViewer}
			onEvent={onEventInViewer}
		/>
	)

	let componentWhenDraggingDividerIfTrue = draggingDivider === true && (
		<Loading loading style={{ width: "100%", height: "100%" }} />
	)

	return (
		<Card  {...otherProps}>
 

			<Dialog fullScreen open={whiteboardIsShown && mediumScreen}>
				<AppBar position="relative">
					<Toolbar>
						<IconButton style={{ marginRight: "32px" }} onClick={onCloseWhiteboardDialog}>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

			</Dialog>

			<div  >
				<SplitterLayout
					customClassName={!whiteboardIsShown || mediumScreen ? "hidePrimaryLayout" : ""}
					percentage
					primaryMinSize={whiteboardIsShown ? 35 : 0} // Percentage
					secondaryMinSize={whiteboardIsShown ? 30 : 100} // Percentage
					secondaryInitialSize={100} // Percentage
					onDragStart={onStartDragInDivider}
					onDragEnd={onEndDragInDivider}
				>
					<div
						style={{ height: "100%" }}
					>
 
					</div>

					<div

						ref={rightContainerRef}
						style={{ height: "100%" }}
					>
						{pdfViewer}

						{componentWhenDraggingDividerIfTrue}
					</div>
				</SplitterLayout>
			</div>
		</Card>
	)
}

 

export default PDFView