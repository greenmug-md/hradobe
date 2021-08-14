import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function PaymentForm({updateContractName}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contract Name
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="conctractName" label="Contract Name"  onChange={updateContractName} fullWidth  />
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}
