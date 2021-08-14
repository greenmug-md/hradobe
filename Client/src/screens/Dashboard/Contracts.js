import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Contract from '../../api/Contract';
import SignApi from '../../api/SignApi';
import Session from '../../utils/Session';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Orders() {
  const classes = useStyles();
  let history = useHistory();
  let [resources, setResources] = useState([])


useEffect(() => {
  async function loadObject() {
    try {
      if(Session.getData().role === "COMPANY") {
      let resourcesOfObject = await Contract.contractgetByCompany(Session.getData().company, "CANDIDATE")
      setResources(resourcesOfObject)
 
      }else {
        let resourcesOfObject = await Contract.contractgetIndividual(Session.getData().id);
        setResources(resourcesOfObject)
 
      }
    } catch (error) {
 
    }
  }

  loadObject()
}, [])

let gotoFileName = async (filename, id) => {
  if (filename) {
    try {
      history.push({
        pathname: '/pdfviewer',
        filename:  filename,
        id:id,
      })
      
    } catch (error) {
    } finally {
    }
  }
};
 
let gotoEditDocument = async (filename, id, html) => {
  if (filename) {
    try {
      history.push({
        pathname: '/editviewer',
        filename:  filename,
        id:id,
        html:html
      })
      
    } catch (error) {
    } finally {
    }
  }
};
 
let sign =  async (filename,email,id,contractname) => {
  await SignApi.getAgreement(filename,Session.getData().email, Session.getData().role,id,contractname);
  await generate(id,Session.getData().role, 'SIGN' )
}

 

let signURL =  async (agreement, id, role) => {
  SignApi.getSigningUrl(agreement,id, role);
}

 
let generate = async (id,role,status) => {
  await SignApi.generate(id,role, status);
  window.location.reload()
}

let resourceItemList = map(resources, (resource) => {
  if(resource&& resource.id){

    let editbutton;
    let nextbutton;
    let resourcestatus;
    
    if(Session.getData().role === "COMPANY" && resource.statuscompany === "DRAFT") {
      editbutton = <Button  onClick={() => gotoEditDocument(resource.filename, resource.id, resource.html)} >Edit</Button>
    } else {
      editbutton = <Button >DISABLED</Button>
    }
    
    if(Session.getData().role === "COMPANY") {
      resourcestatus = resource.statuscompany
      if(resource.statuscompany === "DRAFT") {
        nextbutton=  <Button onClick={() => generate(resource.id,Session.getData().role, "FINALIZED")} >FINALIZE</Button>
      } else if(resource.statuscompany === "FINALIZED") {
        nextbutton=  <Button onClick={() => generate(resource.id,Session.getData().role, "APPROVED")} >APPROVE</Button>
      }else if(resource.statuscompany === "APPROVED") {
        nextbutton=  <Button onClick={() => sign(resource.filename, resource.email,resource.id,resource.contractname)} >CREATE AGREEMENT</Button>
      }else  if(resource.agreementid != null && resource.statuscompany === "SIGN") {
        nextbutton=  <Button onClick={() => signURL(resource.agreementid, resource.id,Session.getData().role)} >SIGN</Button>
      }else if(resource.agreementid != null && resource.statuscompany === "SIGNED") {
        nextbutton=  <Button  >COMPLETE</Button>
      }else {
        nextbutton=  <Button>IN PROGRESS</Button>
      }
    }else  {
      resourcestatus = resource.statuscandidate
      if(resource.statuscandidate === "APPROVED") {
        nextbutton=<Button onClick={() => sign(resource.filename, resource.email, resource.id,resource.contractname)} >CREATE AGREEMENT</Button>
      }else if(resource.statuscandidate === "AGREEMENT CREATED") {
        nextbutton=<Button onClick={() => signURL(resource.agreementid, resource.id)}>SIGN</Button>
      }
      else  if(resource.statuscompany === "DRAFT") {
        nextbutton=  <Button>NOT FINALIZED</Button>
      } else if(resource.statuscompany != "DRAFT" && (resource.statuscandidate != "APPROVED" || resource.statuscandidate != "SIGN")  && resource.transientid == null) {
        nextbutton=  <Button onClick={() => generate(resource.id,Session.getData().role,"APPROVED",resource.id)} >APPROVE</Button>
      }else  if(resource.transientid != null  && resource.statuscandidate != "SIGNED") {
        nextbutton=  <Button onClick={() => signURL(resource.transientid, resource.id,Session.getData().role)} >SIGN</Button>
      }else if(resource.transientid != null && resource.statuscandidate === "SIGNED") {
        nextbutton=  <Button>COMPLETE</Button>
      }else {
        nextbutton=  <Button>IN PROGRESS</Button>
      }
    }


return (
    <TableRow key={resource.id}>
        <TableCell>{resource.lastname}</TableCell>
        <TableCell>{resource.email}</TableCell>
        <TableCell>{resource.contractname}</TableCell>
        <TableCell>{resourcestatus}</TableCell>
        <TableCell>{editbutton}</TableCell>
        <TableCell><Button onClick={() => gotoFileName(resource.filename, resource.id)}>View/Discuss</Button></TableCell>
        <TableCell> {nextbutton}</TableCell>
        </TableRow>
)
  } 
})


  return (
    <React.Fragment>
      <Title>Contracts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contract Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell >EDIT</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>NEXT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resourceItemList}
        </TableBody>
      </Table>
   
    </React.Fragment>
  );
}
