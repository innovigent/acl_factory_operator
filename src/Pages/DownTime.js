import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel, FormControl } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Alert, AlertTitle } from "@material-ui/lab";
import AuthModel from "../components/modals/AuthModel";

const Downtime = () => {
	const history = useHistory();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [type, setType] = useState("");
	const [listData, setListData] = useState([]);
	const [downtimeId, setdowntimeId] = useState("");
	const [epfNo, setepfNo] = useState("");
	const [specialcaseId, setspecialcaseId] = useState("");
	const [productionorder, setproductionorder] = useState("");
	const [err, setErr] = useState("");
	const productionrunId = localStorage.getItem("productionrunId");
	const empid = +localStorage.getItem("empid");
	const [authModal, setAuthModal] = useState(false);

	const setId = () => {
		console.log(location.state.id);
		if (!location.state.id) {
			setdowntimeId(localStorage.getItem("downtimeId"));
		} else {
			setdowntimeId(location.state.id);
		}
	};

	useEffect(() => {
		setId();
		const fetchData = async () => {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("device-token")}`,
				},
			};
			//! previous route - `https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/${macaddress}/getall`
			const result = await axios(
				`https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/getallDowntime`,
				headers
			);
			console.log(result.data);
			setListData(result.data.data.specialCaseDowntime);
			setLoading(false);
		};

		fetchData();
	}, []);

	const submit = async e => {
		e.preventDefault();
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		setErr("");
		if (specialcaseId === "Endshift") {
			try {
				const body = {
					downtimeId,
					epfNo,
					specialcaseId,
					productionrunId,
					productionorder,
					empid,
				};
				const loginResponse = await axios.post(
					`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${localStorage.getItem(
						"community"
					)}/update`,
					body,
					headers
				);
				history.push("/ShiftChange");
			} catch (err) {
				err.response.data.message && setErr(err.response.data.message);
			}
		} else {
			try {
				const body = {
					downtimeId,
					epfNo,
					specialcaseId,
					productionrunId,
					productionorder,
					empid,
				};
				const loginResponse = await axios.post(
					`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${productionrunId}/ReportSpecialCase/${downtimeId}/create`,
					body,
					headers
				);
				history.push("/DowntimeReason");
			} catch (err) {
				err.response.data.message && setErr(err.response.data.message);
			}
		}
	};

	const submits = () => {
		console.log(type, specialcaseId);
	};

	const handleChange = id => {
		setspecialcaseId(id);
	};

	const handleTypeChange = e => {
		setType(e.target.value);
		console.log(type);
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
				<HashLoader loading={loading} size={150} color="#0bab64" />
			</div>
		);
	}
	return (
		<>
			{authModal && <AuthModel setAuthModal={setAuthModal} execute={submit} />}
			<div className="layout__content-main">
				<div className="col-12">
					<div className="position">
						<div className="page-header">Downtime Detection</div>
						<div className="card full-height col-6">
							<div>
								{err ? (
									<Alert severity="error">
										<AlertTitle>Error</AlertTitle>
										{err}
									</Alert>
								) : null}
								<div className="textFieldContainer1">
									<div className="right-corner">Date: {new Date().toDateString()}</div>
								</div>
								<div className="textFieldContainer1"></div>
								{/* to make space*/}
								<div className="textFieldContainer1">
									<label htmlFor="Department">Normal Stoppages</label>
									<FormControl component="fieldset">
										<RadioGroup value={type} onChange={handleTypeChange} row>
											<i
												className="bx bx-transfer-alt"
												style={{ fontSize: "2rem", paddingLeft: "1rem" }}
											></i>
											<FormControlLabel
												value="change-over"
												control={<Radio color="primary" />}
												label="Change Over"
											/>
											<i
												className="bx bx-shield-x"
												style={{ fontSize: "2rem", paddingLeft: "1rem" }}
											></i>
											<FormControlLabel
												value="end-shift"
												control={<Radio color="primary" />}
												label="End Shift"
											/>
										</RadioGroup>
									</FormControl>
								</div>
								<div className="textFieldContainer1">
									<label htmlFor="Department">Downtime Cases</label>
									<div className="wrapper1">
										{listData.map((country, key) => (
											<RadioGroup
												aria-label="type"
												name="type"
												value={specialcaseId}
												onChange={e => handleChange(country.id)}
												row
											>
												<FormControlLabel
													value={country.id}
													control={<Radio color="primary" />}
													label={country.name}
												/>
											</RadioGroup>
										))}
									</div>
								</div>
								<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
									<button onClick={() => setAuthModal(true)} className="submita">
										Submit
									</button>
								</div>
								<div className="textFieldContainer1"></div>
								{/* to make space*/}
							</div>
						</div>
					</div>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default Downtime;
