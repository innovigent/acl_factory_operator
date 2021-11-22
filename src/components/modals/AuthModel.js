import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

import Spinner from "../spinner/Spinner";

import "./authmodal.css";

const AuthModel = ({ execute, setAuthModal }) => {
	const [authCode, setAuthCode] = useState("");
	const [err, setErr] = useState("");
	const [btnState, setBtnState] = useState(false);

	const handleAuth = async e => {
		e.preventDefault();
		setBtnState(true);
		setErr("");

		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		try {
			if (authCode === "") {
				setBtnState(false);
				return setErr("Please enter auth code");
			}
			const response = await axios.post(
				"https://acl-automation.herokuapp.com/api/v1/operator/SystemAuthorization",
				{ password: authCode },
				headers
			);

			if (response.status === 200) {
				execute(e, response.data.data.id);
				setAuthModal(false);
			} else {
				setBtnState(false);
				setErr("Please check authorization code");
			}
		} catch (err) {
			setBtnState(false);
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
						{btnState ? <Spinner /> : "OK"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthModel;
