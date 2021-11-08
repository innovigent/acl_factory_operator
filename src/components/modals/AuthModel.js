import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

import "./authmodal.css";

const AuthModel = ({ execute, setAuthModal }) => {
	const [authCode, setAuthCode] = useState("");
	const [err, setErr] = useState("");

	const headers = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("device-token")}`,
		},
	};

	const handleAuth = async () => {
		setErr("");
		console.log(headers, authCode);
		if (authCode === "") {
			return setErr("Please enter auth code");
		}
		try {
			const response = await axios.get(
				"https://acl-automation.herokuapp.com/api/v1/operator/SystemAuthorization",
				{ password: authCode },
				headers
			);
			console.log(response);
			if (response.status === 200) {
				execute();
				setAuthModal(false);
			}
		} catch (err) {
			console.log(err.response);
			// err && setErr(err.response.data.message);
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
					<button className="submita" onClick={handleAuth}>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthModel;
