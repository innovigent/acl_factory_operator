import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { css } from "@emotion/css";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Alert, AlertTitle } from "@material-ui/lab";
// import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";
import AuthModel from "../components/modals/AuthModel";

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

const TransferDowntime = () => {
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
	const [authModal, setAuthModal] = useState(false);
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
			setListData({ lists: result.data.data.specialCaseDowntime });
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
			{authModal && <AuthModel setAuthModal={setAuthModal} execute={submit} />}
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
								{/* to make space*/}
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

export default TransferDowntime;
