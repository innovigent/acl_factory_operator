import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

import "./authmodal.css";

const ExecutiveAuthModel = ({ execute, setAuthModal }) => {
	const [authCode, setAuthCode] = useState("");
	const [err, setErr] = useState("");

	const handleAuth = async e => {
		e.preventDefault();
		setErr("");

		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		try {
			if (authCode === "") {
				return setErr("Please enter auth code");
			}
			const response = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/Executive/SystemAuthorization",
				{ password: authCode },
				headers
			);

			if (response.status === 200) {
				console.log(response.data);
				localStorage.setItem("executiveId", response.data.data.allData.id);
				localStorage.setItem(
					"executiveName",
					response.data.data.allData.firstName + " " + response.data.data.allData.lastName
				);
				localStorage.setItem("executiveEpfNo", response.data.data.allData.epfNo);
				localStorage.setItem("department", response.data.data.allData.departments.departmentName);
				execute(e, response.data.data.allData.id);
				setAuthModal(false);
			} else {
				setErr("Please check authorization code");
			}
		} catch (err) {
			console.log(err.response);
			err && setErr("Please check authorization code");
		}
	};

	return (
		<div className="auth-background">
			<div className="col-4 card auth-container">
				{err ? (
					<Alert severity="error">
						<AlertTitle>Error</AlertTitle>
						{err}
					</Alert>
				) : null}
				<div className="textFieldContainer1">
					<label htmlFor="epf">Authorization Code</label>
					<input
						className="a"
						placeholder=""
						type="password"
						name=""
						value={authCode}
						onChange={e => setAuthCode(e.target.value)}
					/>
				</div>
				{/* to make space*/}
				<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
					<button
						className="submita"
						style={{
							background: "transparent",
							border: "1px solid #3ab78e",
							color: "#3ab78e",
							marginRight: "1rem",
						}}
						onClick={() => {
							setAuthCode("");
							setAuthModal(false);
						}}
					>
						Close
					</button>
					<button className="submita" onClick={e => handleAuth(e)}>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExecutiveAuthModel;
