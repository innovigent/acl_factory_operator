import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const Login = () => {
	const [Epf, setEpf] = useState("");
	const [Employeeno, setEmployeeno] = useState("");
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
		return Epf.length > 0 && Employeeno.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	const submit = async e => {
		//e.preventDefault();
		setErr("");

		try {
			localStorage.setItem("epfno", Epf);
			localStorage.setItem("empid", Employeeno);
			localStorage.setItem("community", 1);
			history.push("/Changeover");
		} catch (err) {
			err && setErr(err);
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
							<label>EPF Number</label>
							<input
								type="text"
								min="0"
								placeholder="Enter your EPF number"
								value={Epf}
								onChange={e => setEpf(e.target.value)}
							/>
						</div>
						<div className="rowlogin">
							<label>Employee ID</label>
							<input
								type="text"
								min="0"
								placeholder="Enter your employee number"
								value={Employeeno}
								onChange={e => setEmployeeno(e.target.value)}
							/>
						</div>

						<div id="button" className="rowlogin">
							<button disabled={!validateForm()} onClick={submit}>
								Log in
							</button>
						</div>
					</div>
					<div id="alternativeLogin"></div>
				</div>
			</div>
		</>
	);
};

export default Login;
