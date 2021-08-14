import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Contract from "../../../api/Contract";
import NotesAPI from "../../../api/Notes";
import PDFViewer from "../../viewers/PDFViewer";
import Loading from "../Loading";

const UpdateNotesDialog = (props) => {
	let {
		open,
		canvas,
		onClose,
		property,
		otherProps
	} = props
	var history =useHistory()
	let [fileName, setFileName] = useState("")
	let {id, html} = property
	useEffect(() => {
		async function createPDF(property) {
			try {
				let responseData = await NotesAPI.create([{
					canvasSVG: canvas
				}])

				setFileName(responseData.fileName)
				await Contract.updateContract({
					filename: responseData.fileName,
					id: property.id,
					html:canvas
				  });

			} catch (error) {
				console.log(error);
			}
		}
	
		createPDF(property)
	}, [canvas])

 
	

	let pdfViewer = fileName && (
		<PDFViewer
			fileName={fileName}
			url={`http://localhost:4000/public/notes/${fileName}`}
		/>
	)

	let close = useCallback((event) => {
		{ history.push("/dashboard")}
	}, [])

	
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

UpdateNotesDialog.propTypes = {
	open: PropTypes.bool,
	canvas: PropTypes.object.isRequired,
	onClose: PropTypes.func
}

UpdateNotesDialog.defaultProps = {
	open: false,
	onClose: () => { }
}



export default UpdateNotesDialog
