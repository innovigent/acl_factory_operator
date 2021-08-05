import React,{useState} from 'react'

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import Changeover from "./Pages/ChangeOver";
import Downtime from "./Pages/DownTime";
import FaultDetection from "./Pages/MachineFaultDetected";
import OperatorActionTable from "./Pages/OperatorActionTable";
import OperatorExperiment from "./Pages/OperatorExperiment";
import SlowDownSpeed from "./Pages/SlowDownSpeed";
import StatusChanged from "./Pages/StatusChanged";
import Login from "./Pages/Login";
import Home from './Pages/Home';

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/">
                    <Redirect to="/Login" />
                </Route>
                <Route path="/Login" component={Login} />
                <Route path="/Changeover" component={Changeover} />
                <Route path="/Downtime" component={Downtime} />
                <Route path="/FaultDetection" component={FaultDetection} />
                <Route path="/OperatorActionTable" component={OperatorActionTable} />
                <Route path="/OperatorExperiment" component={OperatorExperiment} />
                <Route path="/SlowDownSpeed" component={SlowDownSpeed} />
                <Route path="/StatusChanged" component={StatusChanged} />
                <Route path="/Home" component={Home} />

            </Switch>
        </BrowserRouter>




    )
}

export default Routes