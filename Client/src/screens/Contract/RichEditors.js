import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import EditorCard from "../../components/editor/EditorCard";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function RichEditors(add, contractname) {
  const classes = useStyles();
 
  return (
    <React.Fragment>
        {
          <EditorCard  contractname {...add}/>}
    </React.Fragment>
  );
}
