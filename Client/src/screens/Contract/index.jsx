import {
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { map } from 'lodash';
import React, { useCallback, useState } from 'react';
import Title from "../Dashboard/Title";
import CandidateForm from './CandidateForm';
import ContractNameForm from './ContractNameForm';
import RichEditors from './RichEditors';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        HR Signing Platform
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

 

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Candidates', 'Contract Name', 'Draft Contract'];



function getStepContent(contractname, step, {addCandidate}, {removeCandidate}, {updateContractName}, add) {
  switch (step) {
    case 0:
      return <CandidateForm addCandidate={addCandidate} removeCandidate={removeCandidate}/>;
    case 1:
      return <ContractNameForm updateContractName={updateContractName} />;
    case 2:
      return <RichEditors contractname={contractname} add={add} />;
    default:
      throw new Error('Unknown step');
  }
}


export default function Contract() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
 
  let [add, setadd ] = useState([]) 
  let [contractname, setContractName] = useState("")
 
  let addCandidate =  async (candidate) => {
    let value =  add.filter(item => item.id === candidate.id)
    if(value.length == 0) { 
        setadd(add.concat(candidate))
   }
  }

  let updateContractName = useCallback((event) => {
      setContractName(event.target.value);
  }, []);


 let addItemList = map(add, (a) => { 
    return (
        <ListItem
            key={a.id}
            button
            onClick={() => removeCandidate(a)}
        >
            <ListItemText>
                <Typography variant="subtitle2">{a.email+"        "}   X</Typography>
            </ListItemText>
        </ListItem>
    )
  })
  
  let removeCandidate =  async (candidate) => {
    setadd(add.filter(item => item.id !== candidate.id)) 
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Contract
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                 
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(contractname, activeStep, {addCandidate}, {removeCandidate} , {updateContractName}, add)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    style={{
                   
                      display: activeStep === steps.length - 1? "none" : "block"
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                  </Button>

                </div>
                <Title>Candidates Added</Title>
                <List>
                {addItemList}
                </List>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
