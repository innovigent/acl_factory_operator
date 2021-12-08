import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./authModal.css";

const OptionModal = ({ setOptionModal, data }) => {
	const history = useHistory();

	const manualSlowrunCreate = async () => {
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};

		console.log(headers);
		console.log(localStorage.getItem("productionrunId"));
		try {
			const res = await axios.post(
				`https://acl-automation.herokuapp.com/api/v1/slowspeedcontroller/${localStorage.getItem(
					"productionrunId"
				)}/ManualSlowrecord/addinfo`,
				{},
				headers
			);

			if (res.status === 200) {
				setOptionModal(false);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response);
		}
	};

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
					<button style={{ margin: "1rem" }} className="submita" onClick={manualSlowrunCreate}>
						Slow Run Reasoning
					</button>
				</div>
				<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
					<button
						style={{
							background: "transparent",
							border: "1px solid #fe9843",
							color: "#fe9843",
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
