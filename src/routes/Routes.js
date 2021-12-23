/* eslint-disable eqeqeq */
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Administration from "../pages/Adminstration";
import Changeover from "../pages/ChangeOver";
import DownTime from "../pages/DownTime";
import DowntimeReason from "../pages/DowntimeReason";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MachineLogin from "../pages/MachineLogin";
import SlowDownSpeed from "../pages/SlowDownSpeed";
import SlowRunReason from "../pages/SlowRunReason";
import TransferDowntime from "../pages/TransferDownTime";
import TransferSlowRun from "../pages/TransferSlowRun";

const Routes = () => {
	const history = useHistory();

	const triggerLogin = () => {
		const shiftStartTime1 = localStorage.getItem("shiftStartTime1");
		const shiftStartTime2 = localStorage.getItem("shiftStartTime2");

		if (shiftStartTime1 || shiftStartTime2) {
			if (
				(shiftStartTime1.slice(0, 2).toString() == new Date().getHours() &&
					shiftStartTime1.slice(3, 5).toString() == new Date().getMinutes() &&
					shiftStartTime1.slice(6, 8).toString() == new Date().getSeconds()) ||
				(shiftStartTime2.slice(0, 2).toString() == new Date().getHours() &&
					shiftStartTime2.slice(3, 5).toString() == new Date().getMinutes() &&
					shiftStartTime2.slice(6, 8).toString() == new Date().getSeconds())
			) {
				history.push("/login", { from: "timeTrigger" });
			}
		}
	};

	setInterval(triggerLogin, 1000);

	return (
		<Switch>
			<Route exact path="/" component={MachineLogin} />
			<Route path="/Login" component={Login} />
			<Route path="/Changeover" component={Changeover} />
			<Route path="/Downtime" component={DownTime} />
			<Route path="/SlowDownSpeed" component={SlowDownSpeed} />
			<Route path="/Administration" component={Administration} />
			<Route path="/Home" component={Home} />
			<Route path="/DowntimeReason" component={DowntimeReason} />
			<Route path="/SlowRunReason" component={SlowRunReason} />
			<Route path="/Downtimetransfer" component={TransferDowntime} />
			<Route path="/SlowSpeedTransfer" component={TransferSlowRun} />
			<Route path="*">
				<Redirect to="/" />
			</Route>
		</Switch>
	);
};

export default Routes;
