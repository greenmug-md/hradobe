import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Contract from "./screens/Contract";
import Dashboard from './screens/Dashboard';
import EditDocument from "./screens/Dashboard/EditDocument";
import PDFView from "./screens/Dashboard/PDFView";
import Home from "./screens/Home";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home/logIn" />

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/dashboard">
         <Dashboard />
        </Route>
      
        <Route path="/pdfviewer">
         <PDFView  />
        </Route>


        <Route path="/editviewer">
         <EditDocument  />
        </Route>

        <Route path="/contract">
        <Contract />
       </Route>
        <Route path="*">
          <h2>Not found</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
