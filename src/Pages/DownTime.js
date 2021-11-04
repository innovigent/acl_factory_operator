import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { css } from "@emotion/css";
import CreatableSelect from "react-select/creatable";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import moment from "moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Alert, AlertTitle } from "@material-ui/lab";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const SingleValue = ({ cx, getStyles, selectProps, data, isDisabled, className, ...props }) => {
	console.log(props);
	return (
		<div
			className={cx(
				css(getStyles("singleValue", props)),
				{
					"single-value": true,
					"single-value--is-disabled": isDisabled,
				},
				className
			)}
		>
			<div>{selectProps.getOptionLabel(data)}</div>
		</div>
	);
};

const Downtime = () => {
	const history = useHistory();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const [type, setType] = React.useState("");
	const [listData, setListData] = useState({ lists: [] });
	const [downtimeId, setdowntimeId] = useState("");
	const [epfNo, setepfNo] = useState("");
	const [specialcaseId, setspecialcaseId] = useState("");
	const [productionorder, setproductionorder] = useState("");
	const [err, setErr] = useState("");
	const productionrunId = +localStorage.getItem("productionrunId");
	const macaddress = localStorage.getItem("macaddress");
	const empid = +localStorage.getItem("empid");
	// const data = location.state;

	useEffect(() => {
		console.log(history);
		console.log(location);
		const data = location.state;
		try {
			console.log(data);
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
			const token = await axios(txt);

			const tokentxt = token.data;
			const headers = {
				headers: {
					Authorization: `Bearer ${tokentxt}`,
				},
			};
			//! previous route - `https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/${macaddress}/getall`
			const result = await axios(
				`https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/getall`,
				headers
			);
			setListData({ lists: result.data.data.specialCase });
			setLoading(false);
		};

		fetchData();
	}, []);

	const submit = async e => {
		e.preventDefault();
		const token = await axios(txt);

		const tokentxt = token.data;
		const headers = {
			headers: {
				Authorization: `Bearer ${tokentxt}`,
			},
		};
		setErr("");
		if (specialcaseId === "Endshift") {
			try {
				const body = {
					downtimeId,
					macaddress,
					epfNo,
					specialcaseId,
					productionrunId,
					productionorder,
					empid,
				};
				const loginResponse = await axios.post(
					`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${macaddress}/update`,
					body,
					headers
				);
				history.push("/Home");
			} catch (err) {
				err.response.data.message && setErr(err.response.data.message);
			}
		} else {
			try {
				const body = {
					downtimeId,
					macaddress,
					epfNo,
					specialcaseId,
					productionrunId,
					productionorder,
					empid,
				};
				const loginResponse = await axios.post(
					`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${macaddress}/create`,
					body,
					headers
				);
				history.push("/Home");
			} catch (err) {
				err.response.data.message && setErr(err.response.data.message);
			}
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
				<HashLoader loading={loading} size={150} />
			</div>
		);
	}
	return (
		<>
			<div className="layout__content-main">
				<div className="row">
					<div className="col-12">
						<div className="position">
							<div className="page-header">Downtime</div>
							<div className="card full-height col-6">
								<div>
									{err ? (
										<Alert severity="error">
											<AlertTitle>Error</AlertTitle>
											{err}
										</Alert>
									) : null}
									<div className="textFieldContainer1">
										<div className="right-corner">Date:</div>
										<div className="middle">Line No:</div>

										<div className="left-corner">Status:</div>
									</div>
									<div className="textFieldContainer1"></div>
									{/* to make space*/}
									<div className="textFieldContainer1">
										<label>Employee ID</label>
										<input value={epfNo} disabled></input>
									</div>
									<div className="textFieldContainer1">
										<label>Production Order</label>
										<input value={productionorder} disabled></input>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="Department">Department</label>

										<div className="wrapper1">
											<RadioGroup
												aria-label="type"
												name="type"
												value={type}
												onChange={handleChange}
												row
											>
												<FormControlLabel
													value="uncategorized"
													control={<Radio color="primary" />}
													label="uncategorized"
												/>
												<FormControlLabel
													value="EndShift"
													control={<Radio color="primary" />}
													label="End Shift"
												/>
											</RadioGroup>
										</div>
									</div>
									<div className="textFieldContainer1">
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
														control={<Radio color="primary" />}
														label={country.name}
													/>
												</RadioGroup>
											))}
										</div>
									</div>
									<div className="textFieldContainer1"></div>
									{/* to make space*/}
									<div className="textFieldContainer1"></div>
									{/* to make space*/}
									<button onClick={submit} className="submita">
										submit
									</button>
									<div className="textFieldContainer1"></div>
									{/* to make space*/}
								</div>
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
