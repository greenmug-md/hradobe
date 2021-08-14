
import {
	Card,

	CardActions, IconButton
} from "@material-ui/core";
import React, { useCallback, useState } from 'react';
import RichTextEditor from 'react-rte';
import ExportContractDialog from "../../dialog/ExportContractDialog";
import styles from "./index.module.scss";
const EditorCard = (props) => {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());
 
	let [exportContractDialogIsOpen, setExportContractDialogIsOpen] = useState(false)

	let onClickInDownloadButton = useCallback((event) => {
		setExportContractDialogIsOpen(true)
	}, [])

	let onCloseExportContractDialog = useCallback(() => {
			setExportContractDialogIsOpen(false)
}, [])


  const onChange = (value) => {
    	setValue(value);
    if (props.onChange) {
      props.onChange(value.toString('html'));
    }
  };

  return (
		<Card className={styles.root}>
			{
				exportContractDialogIsOpen && value &&
				<ExportContractDialog
					open={exportContractDialogIsOpen}
					canvas={value.toString('html')}
					onClose={onCloseExportContractDialog}
					property={props}
				/>
			}
			<CardActions style={{overflow: "auto"}}>
				<div className={styles.grow}></div>
				<IconButton color="inherit" Create Draft onClick={onClickInDownloadButton}>
				SAVE
		</IconButton>
			</CardActions>
		<RichTextEditor value={value} onChange={onChange} />
		</Card>
	)


};

export default EditorCard;
