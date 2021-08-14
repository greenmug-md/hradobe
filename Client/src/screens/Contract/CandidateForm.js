import { Table, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { map } from "lodash";
import React, { useCallback, useState } from "react";
import Candidates from "../../api/Candidates";
import Session from "../../utils/Session";
import Title from "../Dashboard/Title";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function AddressForm({ addCandidate }, { removeCandidate }) {
  const classes = useStyles();
  let [candidates, setCandidates] = useState([]);
  let [lastName, setlastName] = useState("");
  let onClickNameButton = async (e) => {
    try {
      let candidatesObject = await Candidates.getByNameCompany(
        lastName,
        Session.getData().company,
        "CANDIDATE"
      );
      setCandidates(candidatesObject);
    } catch (error) {
      console.log(error);
    }
  };

  let onChangeLastNameField = useCallback((event) => {
    setlastName(event.target.value);
  }, []);

 
  let resourceItemList = map(candidates, (candidate) => {
    if (candidate && candidate.id) {
      return (
        <TableRow key={candidate.id}>
          <TableCell>{candidate.lastname}</TableCell>
          <TableCell>{candidate.email}</TableCell>
          <TableCell>
            <Button
              color="primary"
              type="submit"
              value={candidate}
              onClick={() => addCandidate(candidate)}
            >
              Add
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Search Candidates
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            onChange={onChangeLastNameField}
          />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            onClick={onClickNameButton}
            className={classes.iconButton}
            aria-label="search"
          >
            Search
          </Button>
        </Grid>
        

        <Grid item xs={12}>
          {{ candidates } ? (
            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>Candidates</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Contract</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{resourceItemList}</TableBody>
                </Table>

                <br></br>
              </React.Fragment>
            </Paper>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
