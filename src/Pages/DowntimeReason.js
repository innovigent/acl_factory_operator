import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import TopNav from "../components/topnav/TopNav";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthModel from "../components/modals/AuthModel";

const DowntimeReason = () => {
	const history = useHistory();
	const location = useLocation();
	const [downtimeId, setdowntimeId] = useState("");
	const [reportedExecutiveId, setreportedExecutiveId] = useState("");
	const [reasonId, setreasonId] = useState("");
	const [name, setname] = useState("");
	const [permissionId, setpermissionId] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const macaddress = localStorage.getItem("macaddress");
	const productionrunId = +localStorage.getItem("productionrunId");
	const [dataproduction, setdataproduction] = useState([]);
	const [authModal, setAuthModal] = useState(false);

	useEffect(() => {
		const data = location.state;
		const executive = location.executive;
		const name = location.name;
		const permissionId = location.permissionId;
		setdataproduction(data);
		// setdowntimeId(data.id);
		setreportedExecutiveId(executive);
		setname(name);
		setpermissionId(permissionId);
		setLoading(false);
	}, []);

	const submit = async e => {
		e.preventDefault();
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		setErr("");
		try {
			const body = {
				downtimeId,
				reportedExecutiveId,
				reasonId,
				productionrunId,
				permissionId,
			};
			const loginResponse = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/SubmitFaultReason/create",
				body,
				headers
			);
			history.push("/Home");
		} catch (err) {
			err && setErr(err);
		}
	};

	const transfer = async e => {
		history.push({
			pathname: "/Downtimetransfer",
			state: dataproduction,
			executive: reportedExecutiveId,
			name: name,
			permissionId: permissionId,
		});
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
						<div className="page-header">Downtime Reasoning</div>
						<div className="card full-height col-6">
							<div>
								{err ? (
									<Alert severity="error">
										<AlertTitle>Error</AlertTitle>
										{err}
									</Alert>
								) : null}
								<div className="textFieldContainer1"></div>
								{/* to make space*/}
								<div className="textFieldContainer1">
									<label>Production Order Code</label>
									<input value={localStorage.getItem("productionOrderCode")} disabled></input>
								</div>
								<div className="textFieldContainer1">
									<label>Product Name</label>
									<input value={localStorage.getItem("productDetails")} disabled></input>
								</div>
								<div className="textFieldContainer1">
									<label>Executive Information</label>
									<input
										value={
											localStorage.getItem("executiveEpfNo") +
											" - " +
											localStorage.getItem("executiveName")
										}
										disabled
									></input>
								</div>
								<div className="textFieldContainer1">
									<label>Department/Case</label>
									<input value={localStorage.getItem("department")} disabled></input>
								</div>
								<div className="textFieldContainer1">
									<label>Reason</label>
									<select value={reasonId} onChange={e => setreasonId(e.target.value)}>
										<option value="" selected>
											Please Select a Reason
										</option>

										<option value="completed">Resolved</option>
									</select>
								</div>
								<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
									<Link to="/DownTimeTransfer">
										<button
											style={{
												background: "transparent",
												border: "1px solid #3ab78e",
												color: "#3ab78e",
												marginRight: "1rem",
											}}
											className="submita"
										>
											Transfer
										</button>
									</Link>
									<button className="submita" onClick={() => setAuthModal(true)}>
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
