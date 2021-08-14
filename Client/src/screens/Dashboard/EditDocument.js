import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import RichTextEditor from 'react-rte';
import UpdateCard from "../../components/editor/UpdateCard";
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

export default function EditDocument() {
  const classes = useStyles();
  let location = useLocation();
  let [filename, setFilename] = useState("");
  let [html, setHtml] = useState(RichTextEditor.createValueFromString(location.html, "html"));
  let [id, setId] = useState("");

  useEffect(() => {
    setFilename(location.filename)
    setHtml(location.html)
    setId(location.id)
 }, [location]);
 
  return (
    <React.Fragment>
        {
          <UpdateCard  id={id} filename={filename} html={html}/>}
    </React.Fragment>
  );
}
