import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Changeover from "./pages/ChangeOver";
import Downtime from "./pages/DownTime";
import DowntimeReason from "./pages/DowntimeReason";
import FaultDetection from "./pages/MachineFaultDetected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MachineLogin from "./pages/MachineLogin";
import OperatorActionTable from "./pages/OperatorActionTable";
import OperatorBrakdown from "./pages/OperatorBrakdown";
import OperatorExperiment from "./pages/OperatorExperiment";
import SlowDownSpeed from "./pages/SlowDownSpeed";
import StatusChanged from "./pages/StatusChanged";
import VerifyIssue from "./pages/VerifyIssue";
import VerifySlowdown from "./pages/VerifySlowdown";
import Administration from "./pages/Adminstration";
import ShiftChange from "./pages/ShiftChange";
import TransferDowntime from "./pages/TransferDownTime";
import TransferSlowRun from "./pages/TransferSlowRun";
import SlowRunReason from "./pages/SlowRunReason";

const Routes = () => {
	const history = useHistory();

	const triggerLogin = () => {
		const shiftStartTime1 = localStorage.getItem("shiftStartTime1");
		const shiftStartTime2 = localStorage.getItem("shiftStartTime2");

		if (shiftStartTime1 || shiftStartTime2) {
			if (
				(shiftStartTime1.slice(0, 2).toString() == new Date().getHours() &&
					shiftStartTime1.slice(3, 5).toString() == new Date().getMinutes()) ||
				(shiftStartTime2.slice(0, 2).toString() == new Date().getHours() &&
					shiftStartTime2.slice(3, 5).toString() == new Date().getMinutes())
			) {
				history.push("/login", { from: "timeTrigger" });
			}
		}
	};

	setInterval(triggerLogin, 10000);

	return (
		<Switch>
			<Route exact path="/" component={MachineLogin} />
			<Route path="/Login" component={Login} />
			<Route path="/Changeover" component={Changeover} />
			<Route path="/Downtime" component={Downtime} />
			<Route path="/FaultDetection" component={FaultDetection} />
			<Route path="/OperatorActionTable" component={OperatorActionTable} />
			<Route path="/ShiftChange" component={ShiftChange} />
			<Route path="/OperatorExperiment" component={OperatorExperiment} />
			<Route path="/SlowDownSpeed" component={SlowDownSpeed} />
			<Route path="/Administration" component={Administration} />
			<Route path="/StatusChanged" component={StatusChanged} />
			<Route path="/Home" component={Home} />
			<Route path="/VerifyIssue" component={VerifyIssue} />
			<Route path="/DowntimeReason" component={DowntimeReason} />
			<Route path="/SlowRunReason" component={SlowRunReason} />
			<Route path="/Downtimetransfer" component={TransferDowntime} />
			<Route path="/SlowSpeedTransfer" component={TransferSlowRun} />
			<Route path="/OperatorBrakdown" component={OperatorBrakdown} />
			<Route path="/VerifySlowdown" component={VerifySlowdown} />
		</Switch>
	);
};

export default Routes;
