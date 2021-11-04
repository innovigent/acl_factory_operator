import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TopNav from "../components/topnav/TopNav";
import { HashLoader } from "react-spinners";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const OperatorBreakdown = () => {
	const history = useHistory();
	const location = useLocation();
	const [downtimeId, setdowntimeId] = useState("");
	const [specialcaseId, setspecialcaseId] = useState("");
	const [reasonId, setreasonId] = useState("");
	const [name, setname] = useState("");
	const [permissionId, setpermissionId] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const macaddress = localStorage.getItem("macaddress");
	const productionrunId = +localStorage.getItem("productionrunId");
	const empid = +localStorage.getItem("empid");
	const [listData, setListData] = useState({ lists: [] });
	const [listData1, setListData1] = useState({ lists: [] });
	const [dataproduction, setdataproduction] = useState([]);

	function validateForm() {
		return specialcaseId.length > 0;
	}

	// useEffect(() => {
	//     const data = location.state;
	//     const executive = location.executive;
	//     const name = location.name;
	//     const permissionId = location.permissionId;
	//     console.log(data)
	//     setdataproduction(data)
	//     setdowntimeId(data.id)
	//     setreportedExecutiveId(executive)
	//     setname(name)
	//     setpermissionId(permissionId)
	//     setLoading(false);
	// }, []);

	useEffect(() => {
		const fetchData = async () => {
			const token = await axios(txt);

			const tokentxt = token.data;
			const headers = {
				headers: {
					Authorization: `Bearer ${tokentxt}`,
				},
			};
			const result = await axios(
				`https://acl-automation.herokuapp.com/api/v1/faultreason/1/getall`,
				headers
			);
			setListData({ lists: result.data.data.FaultReasonsDetails });
			const result1 = await axios(
				`https://acl-automation.herokuapp.com/api/v1/specialcasescontrollerdevice/getall`,
				headers
			);
			setListData1({ lists: result1.data.data.specialCase });
			setLoading(false);
		};

		fetchData();
	}, []);

	const handleChange = id => {
		setspecialcaseId(id);
	};

	const submit = async e => {
		//e.preventDefault();
		const token = await axios(txt);

		const tokentxt = token.data;
		const headers = {
			headers: {
				Authorization: `Bearer ${tokentxt}`,
			},
		};
		setErr("");
		try {
			const body = {
				macaddress,
				productionrunId,
				permissionId,
				specialcaseId,
				empid,
			};
			const loginResponse = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/manualDowntimeReason/create",
				body,
				headers
			);
			history.push("/Home");
		} catch (err) {
			err && setErr(err);
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
				<HashLoader loading={loading} size={150} color="#0bab64" />
			</div>
		);
	}
	return (
		<>
			<div className="layout__content-main">
				<div className="row">
					<div className="col-12">
						<div className="position">
							<div className="card full-height">
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
										<label>Production order</label>
										<input value={productionrunId} disabled></input>
									</div>
									<div className="textFieldContainer1">
										<label>Special Case:</label>
										<div className="wrapper1">
											{listData1.lists.map((country, key) => (
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
									<div className="textFieldContainer1">
										<label>Operator Id</label>
										<input value={empid} disabled></input>
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

export default OperatorBreakdown;
