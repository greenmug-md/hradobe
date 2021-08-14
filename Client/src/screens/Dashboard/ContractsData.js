import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ContractsDats() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title> Contracts Created</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
    </React.Fragment>
  );
}
