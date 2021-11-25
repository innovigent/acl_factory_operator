import { BrowserRouter, useHistory } from "react-router-dom";

import Routes from "./Routes";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

export default App;
