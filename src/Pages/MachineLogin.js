import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory, Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const MachineLogin = () => {
	const [devicename, setDeviceName] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");
	const history = useHistory();
	const [text, setText] = useState("");

	const headers = {
		headers: {
			Authorization: `Bearer ${text}`,
		},
	};

	useEffect(() => {
		axios(txt).then(res => {
			setText(res.data);
			console.log(res.data);
		});
		// This will have your text inside data attribute
	}, []);

	function validateForm() {
		return devicename.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	const submit = async e => {
		e.preventDefault();
		setErr("");

		if (devicename === "" || password === "") return setErr("Please fill all fields");

		try {
			const res = await axios.post("https://acl-automation.herokuapp.com/api/v1/device/login", {
				devicename,
				password,
			});
			console.log(res);
			if (res.status === 200) {
				localStorage.setItem("token", res.data.data.token);
				localStorage.setItem("community", res.data.data.user.organizationId);
				// localStorage.setItem("epfno", Epf);
				// localStorage.setItem("empid", password);
				// localStorage.setItem("community", 1);
				return history.push("/Changeover");
			}

			setErr();
		} catch (err) {
			console.log(err.response);
			err && setErr(err.response.data.message);
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
					<div>
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
							/>
						</div>

						<div id="button" className="rowlogin">
							<button onClick={submit}>Log in</button>
						</div>
						<div className="rowlogin" style={{ paddingTop: 0, paddingBottom: "1rem" }}>
							<label>
								<Link to="/Login" style={{ color: "#3dbc84", textAlign: "center" }}>
									Login as Operator
								</Link>
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MachineLogin;
