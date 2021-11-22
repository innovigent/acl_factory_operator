import React, { useEffect, useState } from "react";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { HashLoader } from "react-spinners";

import Spinner from "../components/spinner/Spinner";

import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";

const ShiftChange = () => {
	const history = useHistory();
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const [btnState, setBtnState] = useState(false);
	const [Epf, setEpf] = useState("");
	const [epfList, setEpfList] = useState([]);
	const [authCode, setAuthCode] = useState("");
	const headers = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("device-token")}`,
		},
	};

	useEffect(() => {
		getEpfList();
	}, []);

	const submit = async e => {
		e.preventDefault();
		setBtnState(true);
		setErr("");

		try {
			const response = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/operator/login",
				{ operatorId: Epf, password: authCode },
				headers
			);

			if (response.status === 200) {
				localStorage.setItem("epfNo", response.data.data.allRecords.epfNo);
				localStorage.setItem(
					"operatorName",
					response.data.data.allRecords.firstName + " " + response.data.data.allRecords.lastName
				);
				history.push("/Changeover");
			} else {
				setBtnState(false);
				setErr("Please check your details");
			}
		} catch (err) {
			setBtnState(false);
			setErr("Please check your details");
		}
	};

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
			console.log(err.response);
		}
	}

	function validateForm() {
		return Epf.length > 0 && authCode.length > 0;
	}

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
				<HashLoader loading={loading} size={150} color="#0bab64" />
			</div>
		);
	}

	return (
		<>
			<div className="layout__content-main">
				<div className="position">
					<div className="page-header">Shift Change</div>
					<div className="card full-height col-4">
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
									{btnState ? <Spinner /> : "Log in"}
								</button>
							</div>
						</div>
					</div>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default ShiftChange;
