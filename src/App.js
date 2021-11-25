import { BrowserRouter, useHistory } from "react-router-dom";

import Routes from "./Routes";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import "./App.css";

function App() {
	const history = useHistory();

	const triggerLogin = () => {
		const shiftStartTime = localStorage.getItem("shiftStartTime");

		if (
			shiftStartTime.slice(0, 2).toString() == new Date().getHours() &&
			shiftStartTime.slice(3, 5).toString() == new Date().getMinutes()
		) {
			history.push("/login", { from: "timeTrigger" });
		}
	};

	setTimeout(triggerLogin, 1000);

	return (
		<BrowserRouter>
			<Routes />;
		</BrowserRouter>
	);
}

export default App;
