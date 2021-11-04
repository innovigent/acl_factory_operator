import React, { useState } from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Changeover from "./Pages/ChangeOver";
import Downtime from "./Pages/DownTime";
import DowntimeReason from "./Pages/DowntimeReason";
import Downtimetransfer from "./Pages/Downtimetransfer";
import FaultDetection from "./Pages/MachineFaultDetected";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MachineLogin from "./Pages/MachineLogin";
import OperatorActionTable from "./Pages/OperatorActionTable";
import OperatorBrakdown from "./Pages/OperatorBrakdown";
import OperatorExperiment from "./Pages/OperatorExperiment";
import SlowDownSpeed from "./Pages/SlowDownSpeed";
import StatusChanged from "./Pages/StatusChanged";
import VerifyIssue from "./Pages/VerifyIssue";
import VerifySlowdown from "./Pages/VerifySlowdown";
import Administration from "./Pages/Adminstration";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={MachineLogin} />
				<Route path="/Login" component={Login} />
				<Route path="/Changeover" component={Changeover} />
				<Route path="/Downtime" component={Downtime} />
				<Route path="/FaultDetection" component={FaultDetection} />
				<Route path="/OperatorActionTable" component={OperatorActionTable} />
				<Route path="/OperatorExperiment" component={OperatorExperiment} />
				<Route path="/SlowDownSpeed" component={SlowDownSpeed} />
				<Route path="/Administration" component={Administration} />
				<Route path="/StatusChanged" component={StatusChanged} />
				<Route path="/Home" component={Home} />
				<Route path="/VerifyIssue" component={VerifyIssue} />
				<Route path="/DowntimeReason" component={DowntimeReason} />
				<Route path="/Downtimetransfer" component={Downtimetransfer} />
				<Route path="/OperatorBrakdown" component={OperatorBrakdown} />
				<Route path="/VerifySlowdown" component={VerifySlowdown} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
