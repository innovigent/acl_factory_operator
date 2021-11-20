import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory, Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";

const Login = () => {
	const [Epf, setEpf] = useState("");
	const [epfList, setEpfList] = useState([]);
	const [authCode, setAuthCode] = useState("");
	const [err, setErr] = useState("");
	const history = useHistory();
	const [text, setText] = useState("");

	const headers = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("device-token")}`,
		},
	};

	useEffect(() => {
		getEpfList();
	}, []);

	function validateForm() {
		return Epf.length > 0 && authCode.length > 0;
	}

	async function getEpfList() {
		try {
			const res = await axios.get(
				`https://acl-automation.herokuapp.com/api/v1/operator/${localStorage.getItem(
					"community"
				)}/listOperatorIPC`,
				headers
			);
			setEpfList(res.data.data.OperatorsDetails);
		} catch (err) {
			console.log(err.response);
		}
	}

	const submit = async e => {
		e.preventDefault();
		setErr("");

		try {
			const response = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/operator/login",
				{ operatorId: Epf, password: authCode },
				headers
			);

			if (response.status === 200) {
				localStorage.setItem("token", response.data.data.token);
				localStorage.setItem("epfNo", response.data.data.allRecords.epfNo);
				localStorage.setItem(
					"operatorName",
					response.data.data.allRecords.firstName + " " + response.data.data.allRecords.lastName
				);
				history.push("/Changeover");
			} else {
				setErr("Please check your details");
			}
		} catch (err) {
			err && setErr("Please check your details");
		}
	};

	return (
		<>
			<div className="layout__content-main">
				<div style={{ textAlign: "center", position: "relative", marginTop: "6rem" }}>
					<h1
						className="page-header login-header"
						data-aos="zoom-out"
						style={{ marginBottom: "0px" }}
					>
						Operator Login
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
								list="epfList"
								onChange={e => setEpf(e.target.value)}
							/>
							<datalist id="epfList">
								{epfList.length > 0 &&
									epfList.map(epf => <option value={epf.id}>{"EPF No - " + epf.epfNo}</option>)}
							</datalist>
						</div>
						<div className="rowlogin">
							<label>Authorization Code</label>
							<input
								type="password"
								min="0"
								placeholder="Enter your authorization code"
								value={authCode}
								onChange={e => setAuthCode(e.target.value)}
							/>
						</div>

						<div id="button" className="rowlogin">
							<button disabled={!validateForm()} onClick={submit}>
								Log in
							</button>
						</div>
						<div className="rowlogin" style={{ paddingTop: 0, paddingBottom: "1rem" }}>
							<label style={{ textAlign: "center" }}>
								<Link to="/" style={{ color: "#3dbc84", fontWeight: "500", textAlign: "center" }}>
									Login with Machine Login
								</Link>
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
