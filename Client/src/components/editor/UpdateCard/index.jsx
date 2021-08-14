
import {
	Card,

	CardActions, IconButton
} from "@material-ui/core";
import React, { useCallback, useState } from 'react';
import RichTextEditor from 'react-rte';
import UpdateNotesDialog from "../../dialog/UpdateNotesDialog";
import styles from "./index.module.scss";
const UpdateCard = (props) => {
	let {id, filename, html} = props
	
    const [value, setValue] = useState(RichTextEditor.createValueFromString(props.html.toString('html'),"html"));
 
	let [exportNotesDialogIsOpen, setExportNotesDialogIsOpen] = useState(false)

	let onClickInDownloadButton = useCallback((event) => {
		setExportNotesDialogIsOpen(true)
	}, [])

	let onCloseExportNotesDialog = useCallback(() => {
	setExportNotesDialogIsOpen(false)
	}, [])

 

  const onChange = (value) => {
	console.log("hereh"+props.html)
    	setValue(value);
		   console.log(value.toString('html'));
    if (props.onChange) {
      props.onChange(value.toString('html'));
    }
  };

  return (
		<Card className={styles.root}>
			{
				exportNotesDialogIsOpen && value &&
				<UpdateNotesDialog
					open={exportNotesDialogIsOpen}
					canvas={value.toString('html')}
					onClose={onCloseExportNotesDialog}
					property={props}
				/>
			}
			<CardActions style={{overflow: "auto"}}>
				<div className={styles.grow}></div>
				<IconButton color="inherit" Create Draft onClick={onClickInDownloadButton}>
				Update
		</IconButton>
			</CardActions>
		<RichTextEditor value={value} onChange={onChange} />
		</Card>
	)


};

export default UpdateCard;
