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
import AuthModel from "../components/modals/ExecutiveAuthModal";
import assetUrl from "../config/url.config";

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
		if (Object.keys(location.state).length === 0) {
			if (localStorage.getItem("downtimeId")) {
				setdowntimeId(localStorage.getItem("downtimeId"));
			} else {
				setdowntimeId("");
			}
		} else {
			if (location.state?.from === "administration") {
				setdowntimeId(location.state.id);
			} else {
				setdowntimeId(location.state.data.downtime[0].id);
			}
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
			const result = await axios(
				`https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/getallDowntime`,
				headers
			);
			console.log(result.data.data);
			setListData(result.data.data.specialCaseDowntime);
			setLoading(false);
		};

		fetchData();
	}, []);

	const submit = async (e, id) => {
		e.preventDefault();
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		setErr("");
		if (type === "change-over") {
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

				if (loginResponse.status === 200) {
					window.location.href = "/ChangeOver";
				}
			} catch (err) {
				console.log(err.response);
				setErr("Something went wrong");
			}
		} else if (type === "end-shift") {
			history.push("/login");
		} else {
			try {
				const body = {
					downtimeId,
					epfNo,
					specialcaseId,
					productionrunId,
					productionorder,
					authorziedPersonId: id,
					empid,
				};

				const loginResponse = await axios.post(
					`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${productionrunId}/ReportSpecialCase/${downtimeId}/create`,
					body,
					headers
				);

				if (loginResponse.status === 200) {
					localStorage.setItem("specialcaseId", specialcaseId);
					history.push("/Home", { downtimeId, id });
				} else {
					setErr("Something went wrong");
				}
			} catch (err) {
				console.log(err.response);
				setErr("Something went wrong");
			}
		}
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
											<div className="specialcase-container">
												<img
													className="specialcase-img"
													src="https://cdn0.iconfinder.com/data/icons/website-design-4/467/setting_icon-512.png"
													alt="change-over"
												/>
												<FormControlLabel
													value="change-over"
													control={<Radio color="primary" />}
													label="Change Over"
												/>
											</div>
											<div className="specialcase-container">
												<img
													className="specialcase-img"
													src="https://cdn4.iconfinder.com/data/icons/project-management-4-2/65/176-512.png"
													alt="change-shift"
												/>
												<FormControlLabel
													value="end-shift"
													control={<Radio color="primary" />}
													label="End Shift"
												/>
											</div>
										</RadioGroup>
									</FormControl>
								</div>
								<div className="textFieldContainer1">
									<label htmlFor="Department">Downtime Cases</label>
									<div className="wrapper1 flex-style">
										{listData.map((country, key) => (
											<div className="specialcase-container">
												<RadioGroup
													aria-label="type"
													name="type"
													value={specialcaseId}
													onChange={e => handleChange(country.id)}
													row
												>
													<img
														className="specialcase-img"
														src="https://cdn4.iconfinder.com/data/icons/project-management-4-2/65/176-512.png"
														alt="change-shift"
													/>
													<FormControlLabel
														value={country.id}
														control={<Radio color="primary" />}
														label={country.name}
													/>
												</RadioGroup>
											</div>
										))}
									</div>
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										paddingTop: "2rem",
										flexWrap: "wrap",
									}}
								>
									<button
										className="submita"
										style={{
											background: "transparent",
											border: "1px solid #3ab78e",
											color: "#3ab78e",
										}}
										onClick={() => {
											setType("");
											setspecialcaseId("");
										}}
									>
										Clear
									</button>
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
