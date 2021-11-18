import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import TopNav from "../components/topnav/TopNav";
import { HashLoader } from "react-spinners";
// import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";
import AuthModel from "../components/modals/AuthModel";

const DowntimeReason = () => {
	const history = useHistory();
	const location = useLocation();
	const [slowSpeedId, setSlowSpeedId] = useState("");
	const [reportedExecutiveId, setreportedExecutiveId] = useState("");
	const [specialcaseId, setSpecialCaseId] = useState("");
	const [name, setname] = useState("");
	const [permissionId, setpermissionId] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const macaddress = localStorage.getItem("macaddress");
	const community = localStorage.getItem("community");
	const productionrunId = +localStorage.getItem("productionrunId");
	const [listData, setListData] = useState([]);
	const [dataproduction, setdataproduction] = useState([]);
	const [authModal, setAuthModal] = useState(false);

	useEffect(() => {
		setSlowSpeedId(localStorage.getItem("slowRunId"));
		setLoading(false);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("device-token")}`,
				},
			};
			try {
				const result = await axios(
					`https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/getallSlowSpeed`,
					headers
				);
				setListData(result.data.data.specialCaseslowSpeed);
				setLoading(false);
			} catch (err) {
				console.log(err.response);
			}
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
		try {
			const body = {
				slowSpeedId,
				authorziedPersonId: id,
				specialcaseId,
			};
			const res = await axios.post(
				`https://acl-automation.herokuapp.com/api/v1/SlowRunDetection/${productionrunId}/ReportSpecialCase/${slowSpeedId}/create`,
				body,
				headers
			);

			if (res.status === 200) {
				history.push("/Home");
			} else {
				setErr("Something went wrong");
			}
		} catch (err) {
			console.log(err.response);
			setErr("Something went wrong");
		}
	};

	const handleChange = id => {
		setSpecialCaseId(id);
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
						<div className="page-header">Slow Run Reasoning</div>
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
									<label>Slow Run Reasons</label>

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
								<div className="textFieldContainer1"></div>
								{/* to make space*/}
								<div className="textFieldContainer1"></div>
								{/* to make space*/}
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
			</div>
			<TopNav />
		</>
	);
};

export default DowntimeReason;
