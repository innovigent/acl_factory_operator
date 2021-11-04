import React from "react";

import "./authmodal.css";

const OptionModal = ({ setOptionModal }) => {
	return (
		<div className="auth-background">
			<div className="col-6 card auth-container">
				<div className="textFieldContainer1">
					<label htmlFor="epf">Machine Speed</label>
					<input className="a" placeholder="" type="text" name="" value="200m/min" disabled />
				</div>
				<div className="textFieldContainer1">
					<label htmlFor="epf">Output</label>
					<input className="a" placeholder="" type="text" name="" value="6000m" disabled />
				</div>
				{/* to make space*/}
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<button
						style={{ margin: "1rem" }}
						className="submita"
						onClick={() => {
							setOptionModal(false);
						}}
					>
						Shift Change
					</button>
					<button
						style={{ margin: "1rem" }}
						className="submita"
						onClick={() => {
							setOptionModal(false);
						}}
					>
						Change Over
					</button>
					<button
						style={{ margin: "1rem" }}
						className="submita"
						onClick={() => {
							setOptionModal(false);
						}}
					>
						Slow Speed Reasoning
					</button>
				</div>
				<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
					<button
						style={{
							background: "transparent",
							border: "1px solid #3ab78e",
							color: "#3ab78e",
							marginRight: "1rem",
						}}
						className="submita"
						onClick={() => {
							setOptionModal(false);
						}}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default OptionModal;
