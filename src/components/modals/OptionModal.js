import React from "react";
import { useHistory } from "react-router-dom";

import "./authmodal.css";

const OptionModal = ({ setOptionModal, data }) => {
	const history = useHistory();

	return (
		<div className="auth-background">
			<div className="col-6 card auth-container">
				<div className="textFieldContainer1">
					<label htmlFor="epf">Machine Speed</label>
					<input
						className="a"
						placeholder=""
						type="text"
						name=""
						value={data.speed ? data.speed + " m/min" : "Loading.."}
						disabled
					/>
				</div>
				<div className="textFieldContainer1">
					<label htmlFor="epf">Output</label>
					<input
						className="a"
						placeholder=""
						type="text"
						name=""
						value={data.output ? data.output + " m" : "Loading.."}
						disabled
					/>
				</div>
				{/* to make space*/}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<button
						style={{ margin: "1rem" }}
						className="submita"
						onClick={() => {
							history.push("/login", { from: "timeTrigger" });
							setOptionModal(false);
						}}
					>
						Shift Change
					</button>
					<button
						style={{ margin: "1rem" }}
						className="submita"
						onClick={() => {
							history.push("/Changeover", {});
							setOptionModal(false);
						}}
					>
						Change Over
					</button>
					<button
						style={{ margin: "1rem" }}
						className="submita"
						onClick={() => {
							history.push("/SlowDownSpeed", {});
							setOptionModal(false);
						}}
					>
						Slow Run Reasoning
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
