import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Changeover from "./pages/ChangeOver";
import Downtime from "./pages/DownTime";
import DowntimeReason from "./pages/DowntimeReason";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MachineLogin from "./pages/MachineLogin";
import SlowDownSpeed from "./pages/SlowDownSpeed";
import Administration from "./pages/Adminstration";
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
			<Route path="/SlowDownSpeed" component={SlowDownSpeed} />
			<Route path="/Administration" component={Administration} />
			<Route path="/Home" component={Home} />
			<Route path="/DowntimeReason" component={DowntimeReason} />
			<Route path="/SlowRunReason" component={SlowRunReason} />
			<Route path="/Downtimetransfer" component={TransferDowntime} />
			<Route path="/SlowSpeedTransfer" component={TransferSlowRun} />
		</Switch>
	);
};

export default Routes;
