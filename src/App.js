import { BrowserRouter } from "react-router-dom";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/chooseButton.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import "./assets/css/login.css";
import "./assets/css/operator.css";
import "./assets/css/user.css";
import "./App.css";

import Routes from "./routes/Routes";

function App() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

export default App;
