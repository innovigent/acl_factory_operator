import React from "react";

import "./authmodal.css";

const AuthModel = ({ execute, setAuthModal }) => {
	return (
		<div className="auth-background">
			<div className="col-4 card auth-container">
				<div className="textFieldContainer1">
					<label htmlFor="epf">Authorization Code</label>
					<input className="a" placeholder="" type="password" name="" />
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
