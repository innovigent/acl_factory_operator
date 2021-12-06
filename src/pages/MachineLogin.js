import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";

import "../assets/css/login.css";

import Spinner from "../components/spinner/Spinner";

const MachineLogin = () => {
	const history = useHistory();
	const [devicename, setDeviceName] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");
	const [btnState, setBtnState] = useState(false);

	const submit = async e => {
		e.preventDefault();
		setErr("");
		setBtnState(true);

		if (devicename === "" || password === "") {
			setBtnState(false);
			return setErr("Please fill all fields");
		}

		try {
			const res = await axios.post("https://acl-automation.herokuapp.com/api/v1/device/login", {
				devicename,
				password,
			});

			if (res.status === 200) {
				localStorage.setItem("device-token", res.data.data.token);
				localStorage.setItem("community", res.data.data.user.organizationId);
				localStorage.setItem("factoryId", res.data.data.user.factoryId);
				return history.push("/login");
			}

			setErr("");
			setBtnState(false);
		} catch (err) {
			setErr(err.response.data.message);
			setBtnState(false);
		}
	};

	return (
		<>
			<div className="layout__content-main">
				<div style={{ textAlign: "center", position: "relative", marginTop: "6rem" }}>
					<h1
						className="page-header login-header accent-header"
						data-aos="zoom-out"
						style={{ marginBottom: "0px" }}
					>
						Welcome Back
					</h1>
				</div>
				<div id="loginform">
					<div className="login-form">
						{err ? (
							<Alert severity="error">
								<AlertTitle>Error</AlertTitle>
								{err}
							</Alert>
						) : null}
						<div className="rowlogin" style={{ paddingTop: "3rem" }}>
							<label>Machine UUID</label>
							<input
								type="text"
								min="0"
								placeholder="Enter machine UUID"
								value={devicename}
								onChange={e => setDeviceName(e.target.value)}
								disabled={btnState}
							/>
						</div>
						<div className="rowlogin">
							<label>Machine Password</label>
							<input
								type="password"
								min="0"
								placeholder="Enter machine password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								disabled={btnState}
							/>
						</div>

						<div id="button" className="rowlogin">
							<button onClick={submit}>{btnState ? <Spinner /> : "Log in"}</button>
						</div>
						<div className="rowlogin" style={{ paddingTop: 0, paddingBottom: "1rem" }}></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MachineLogin;
