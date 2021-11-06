import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

import "./authmodal.css";

const AuthModel = ({ execute, setAuthModal, err, setAuthCode, authCode }) => {
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
					<button className="submita" onClick={execute}>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthModel;
