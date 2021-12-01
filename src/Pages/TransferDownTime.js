import React, { useEffect, useState } from "react";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Alert, AlertTitle } from "@material-ui/lab";

import Spinner from "../components/spinner/Spinner";

import "../assets/css/user.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operator.css";

const TransferDowntime = () => {
	const history = useHistory();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [btnState, setBtnState] = useState(false);
	const [listData, setListData] = useState({ lists: [] });
	const [downtimeId, setdowntimeId] = useState("");
	const [epfNo, setepfNo] = useState("");
	const [specialcaseId, setspecialcaseId] = useState("");
	const [productionorder, setproductionorder] = useState("");
	const [err, setErr] = useState("");
	const productionrunId = +localStorage.getItem("productionrunId");
	const macaddress = localStorage.getItem("macaddress");
	const empid = +localStorage.getItem("empid");
	const data = location.state;

	useEffect(() => {
		try {
			const data = location.state;
			setdowntimeId(data.id);
			setepfNo(data.downtime[0].operatorId);
			setproductionorder(data.downtime[0].specialcaseId);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
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
			setListData({ lists: result.data.data.specialCaseDowntime });
			setLoading(false);
		};

		fetchData();
	}, []);

	const submit = async (e, id) => {
		e.preventDefault();
		setBtnState(true);
		setErr("");
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};

		try {
			const body = {
				downtimeId,
				macaddress,
				reportedExecutiveId: id,
				epfNo,
				specialcaseId,
				productionrunId,
				productionorder,
				empid,
			};
			const loginResponse = await axios.post(
				`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${localStorage.getItem(
					"executiveId"
				)}/downtime/${data.id}/TransferDowntime`,
				body,
				headers
			);

			if (loginResponse.status === 200) {
				history.push("/Home");
			}
		} catch (err) {
			setBtnState(false);
			setErr(err.response.data.message);
		}
	};

	const handleChange = id => {
		setspecialcaseId(id);
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
			<div className="layout__content-main">
				<div className="col-12">
					<div className="position">
						<div className="page-header">Downtime Transfer</div>
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
								<div className="textFieldContainer1">
									<label htmlFor="Department">TransferDowntime Cases</label>
									<div className="wrapper1">
										{listData.lists.map((country, key) => (
											<RadioGroup
												aria-label="type"
												name="type"
												value={specialcaseId}
												onChange={e => handleChange(country.id)}
												row
											>
												<FormControlLabel
													value={country.id}
													control={
														<Radio
															color="primary"
															disabled={location.state.specialCaseId === country.id}
														/>
													}
													label={country.name}
												/>
											</RadioGroup>
										))}
									</div>
								</div>
								<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
									<button onClick={submit} className="submita">
										{btnState ? <Spinner /> : "Submit"}
									</button>
								</div>
								<div className="textFieldContainer1"></div>
							</div>
						</div>
					</div>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default TransferDowntime;
