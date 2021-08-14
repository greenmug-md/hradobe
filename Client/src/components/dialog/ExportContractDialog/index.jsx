import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import 'react-splitter-layout/lib/index.css';
import Contract from "../../../api/Contract";
import NotesAPI from "../../../api/Notes";
import Session from '../../../utils/Session';
import PDFViewer from "../../viewers/PDFViewer";
import Loading from "../Loading";
const ExportContractDialog = (props) => {
	let {
		open,
		canvas,
		onClose,
		property,
		otherProps
	} = props
	var history =useHistory()
	let [fileName, setFileName] = useState("")
	let [resource, setResource] = useState([])
	let {contractname, add} = property
	let rightContainerRef = useRef(null)
	useEffect(() => {
		async function createPDF(contractname , prop) {
			try {
				let responseData = await NotesAPI.create([{
					canvasSVG: canvas
				}])

				setFileName(responseData.fileName)
				setResource(prop.id)
				let response = await Contract.contractCreate({
					filename: responseData.fileName,
					userId: prop.id,
					role: prop.role,
					firstname: prop.firstname,
					lastname:prop.lastname,
					username: prop.username,
					email: prop.email,
					company: prop.company,
					statuscandidate: "DRAFT",
					statuscompany: "DRAFT",
					contractname:contractname,
					html:canvas
				  });

			} catch (error) {
				console.log(error);
			}
		}
	
		 add.map(prop => (
			createPDF(contractname, prop)
		))

		
	}, [canvas])

	let close = useCallback((event) => {
		{ history.push("/dashboard")}
	}, [])
 
	
	let pdfViewerProps = {
		style: { height: "100%" },
		viewMode: "FULL_WINDOW",
		previewOptions: {
			showLeftHandPanel: false
		}
	}
 


	let pdfViewer = fileName && (
		<PDFViewer
			username={Session.getData().username}
			fileName={fileName}
			url={`http://localhost:4000/public/notes/${fileName}`}
			{...pdfViewerProps}
		/>
	)

	let loadingComponent = !fileName && (
		<Loading
			message="PDF"
			loading
			style={{ width: "100%", height: "100%" }}
		/>
	)

	return (
		<Dialog open={open} fullScreen {...otherProps}>
			<AppBar position="relative">
				<Toolbar>
					<IconButton style={{ marginRight: "32px" }} onClick={close}>
						<CloseIcon />
					</IconButton>

					<Typography variant="h6">
						Export Draft Contract
					</Typography>
				</Toolbar>
			</AppBar>

			{pdfViewer}

			{loadingComponent}
		</Dialog>
	)

}

ExportContractDialog.defaultProps = {
	open: false,
	onClose: () => {  }
}

export default ExportContractDialog
