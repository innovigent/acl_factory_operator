import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

import Spinner from "../spinner/Spinner";

import "./authModal.css";

const ExecutiveAuthModel = ({ execute, setAuthModal }) => {
	const [authCode, setAuthCode] = useState("");
	const [err, setErr] = useState("");
	const [btnState, setBtnState] = useState(false);

	const handleAuth = async e => {
		e.preventDefault();
		setErr("");
		setBtnState(true);

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
				"https://acl-automation.herokuapp.com/api/v1/Executive/SystemAuthorization",
				{ password: authCode },
				headers
			);

			if (response.status === 200) {
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
				setBtnState(false);
				setErr("Please check authorization code");
			}
		} catch (err) {
			console.log(err.response);
			setBtnState(false);
			setErr("Please check authorization code");
		}
	};

	return (
		<div className="auth-background">
			<div className="col-6 card auth-container">
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
						disabled={btnState}
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						paddingTop: "2rem",
						flexWrap: "wrap",
					}}
				>
					<button
						className="submita"
						style={{
							background: "transparent",
							border: "1px solid #fe9843",
							color: "#fe9843",
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

export default ExecutiveAuthModel;
