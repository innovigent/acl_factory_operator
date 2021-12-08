import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { HashLoader } from "react-spinners";
import axios from "axios";

import "../assets/css/login.css";

import Spinner from "../components/spinner/Spinner";

const Login = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [epf, setEpf] = useState("");
	const [epfList, setEpfList] = useState([]);
	const [authCode, setAuthCode] = useState("");
	const [err, setErr] = useState("");
	const [btnState, setBtnState] = useState(false);

	const headers = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("device-token")}`,
		},
	};

	useEffect(() => {
		async function getEpfList() {
			try {
				const res = await axios.get(
					`https://acl-automation.herokuapp.com/api/v1/operator/${localStorage.getItem(
						"community"
					)}/listOperatorIPC`,
					headers
				);
				setEpfList(res.data.data.OperatorsDetails);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log(err.response);
			}
		}

		getEpfList();
	}, []);

	useEffect(() => {
		const getShifts = async () => {
			try {
				const res = await axios.get(
					`https://acl-automation.herokuapp.com/api/v1/shiftcontrollers/TimeDrivenList`,
					headers
				);

				if (res.status === 200) {
					const factoryId = parseInt(localStorage.getItem("factoryId"));

					for (let i = 0; i < res.data.data.ShiftDetails.length; i++) {
						if (res.data.data.ShiftDetails[i].factoryId === factoryId) {
							localStorage.setItem(
								`shiftStartTime${i + 1}`,
								res.data.data.ShiftDetails[i].startTime
							);
							localStorage.setItem(`shiftEndTime${i + 1}`, res.data.data.ShiftDetails[i].endTime);
						}
					}
				}
			} catch (err) {
				console.log(err.response);
			}
		};
		getShifts();
	}, []);

	function validateForm() {
		return epf.length > 0 && authCode.length > 0;
	}

	const submit = async e => {
		e.preventDefault();
		setBtnState(true);
		setErr("");

		try {
			const response = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/operator/login",
				{ operatorId: epf, password: authCode },
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
				setBtnState(false);
			}
		} catch (err) {
			err && setErr(err.response.data.message);
			setBtnState(false);
		}
	};

	if (loading) {
		return (
			<div
				style={{
					padding: "10px 20px",
					textAlign: "center",
					justifyContent: "center",
					display: "flex",
					alignItems: "center",
					width: "100%",
					height: "100vh",
					backgroundColor: "#FFFFFF",
				}}
			>
				<HashLoader loading={loading} size={150} color="#fe9843" />
			</div>
		);
	}

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
					<div style={{ marginBottom: "4rem" }}>
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
								value={epf}
								list="epfList"
								onChange={e => setEpf(e.target.value)}
								disabled={btnState}
							/>
							<datalist id="epfList">
								{epfList.length > 0 &&
									epfList.map(epf => (
										<option key={epf.id} value={epf.id}>
											{"EPF No - " + epf.epfNo}
										</option>
									))}
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
								disabled={btnState}
							/>
						</div>

						<div id="button" className="rowlogin">
							<button disabled={!validateForm()} onClick={submit}>
								{btnState ? <Spinner /> : "Log in"}
							</button>
						</div>
						{history.location.state && localStorage.getItem("epfNo") ? (
							<div id="button" className="rowlogin" style={{ paddingTop: "0", marginTop: ".5rem" }}>
								<button onClick={() => history.push("/Changeover")}>Continue</button>
							</div>
						) : (
							""
						)}
						<div className="rowlogin" style={{ paddingTop: 0, paddingBottom: "1rem" }}></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
