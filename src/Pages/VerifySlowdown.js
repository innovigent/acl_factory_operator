import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import "../assets/css/Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
// import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const VerifyIssue = () => {
	const history = useHistory();
	const location = useLocation();
	const [verificationCode, setverificationCode] = useState("");
	const [err, setErr] = useState("");
	const [dataproduction, setdataproduction] = useState([]);
	const macaddress = localStorage.getItem("macaddress");

	function validateForm() {
		return verificationCode.length > 0;
	}

	useEffect(() => {
		setdataproduction(location.state);
	}, []);

	const submit = async e => {
		//e.preventDefault();

		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		setErr("");
		try {
			const body = { verificationCode, macaddress };
			const loginResponse = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/slowruncontroller/verify",
				body,
				headers
			);
			history.push({
				pathname: "/SlowDownSpeed",
				state: dataproduction,
				executive: loginResponse.data.data.id,
				name: loginResponse.data.data.userInfo.firstName,
				permissionId: loginResponse.data.data.permissionId,
			});
		} catch (err) {
			err && setErr(err);
		}
	};

	return (
		<>
			<div className="layout__content-main">
				<div id="loginform">
					<h2 id="headerTitle">Issue reporting</h2>
					<div>
						{err ? (
							<Alert severity="error">
								<AlertTitle>Error</AlertTitle>
								{err}
							</Alert>
						) : null}
						<div className="rowlogin">
							<label>Verification number</label>
							<input
								type="text"
								placeholder="Enter your Verification number"
								value={verificationCode}
								onChange={e => setverificationCode(e.target.value)}
							/>
						</div>

						<div id="button" className="rowlogin">
							<button disabled={!validateForm()} onClick={submit}>
								Verify
							</button>
						</div>
					</div>
					<div id="alternativeLogin"></div>
				</div>
			</div>
		</>
	);
};

export default VerifyIssue;
