import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Administration = () => {
	const [slowSpeedListData, setSlowSpeedListData] = useState({ lists: [] });
	const [downtimeListData, setDowntimeListData] = useState({ lists: [] });
	const [loading, setLoading] = useState(true);

	const headers = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("device-token")}`,
		},
	};

	useEffect(() => {
		getDowntimeList();
		getSlowSpeedList();
		setLoading(false);
	}, []);

	const getDowntimeList = async () => {
		try {
			const res = await axios.get(
				`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${localStorage.getItem(
					"productionrunId"
				)}/getall`,
				headers
			);
			setDowntimeListData(res.data.data.productionRunLog);
		} catch (error) {
			console.log(error.response);
		}
	};

	const getSlowSpeedList = async () => {
		try {
			const res = await axios.get(
				`https://acl-automation.herokuapp.com/api/v1/slowSpeedDetection/${localStorage.getItem(
					"productionrunId"
				)}/getListSlowspeed`,
				headers
			);
			setSlowSpeedListData(res.data.data.productionRunLog);
		} catch (error) {
			console.log(error.response);
		}
	};

	const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

	const renderOrderBodyDownTime = (item, index) => (
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.name}</td>
			<td>
				<Link to="/DownTimeTransfer">
					<button
						className="submita"
						style={{
							background: "transparent",
							border: "1px solid #3ab78e",
							color: "#3ab78e",
							padding: "5px",
							fontSize: "0.8rem",
						}}
					>
						Transfer
					</button>
				</Link>
			</td>
		</tr>
	);

	const renderOrderBodySlowRun = (item, index) => (
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.name}</td>
		</tr>
	);

	const fieldsDowntime = ["ID", "Start Time", "End Time", "Down Time Case", "Status", "Action"];
	const fieldsSlowSpeed = ["ID", "Start Time", "End Time", "Status"];

	if (loading) {
		return (
			<div
				style={{
					padding: "10px 20px",
					textAlign: "center",
					justifyContent: "center",
					display: "flex",
					alignItems: "center",
					width: "100%",
					height: "100vh",
					backgroundColor: "#FFFFFF",
				}}
			>
				<HashLoader loading={loading} size={150} color="#0bab64" />
			</div>
		);
	}

	return (
		<>
			<div className="layout__content-main">
				<div className="position">
					<div className="page-header">Administration</div>
					<div className="full-height col-8">
						<div className="card" style={{ position: "relative", minHeight: "20vh" }}>
							<h2 style={{ textAlign: "left", paddingBottom: "1rem" }}>Downtime</h2>
							{loading ? (
								<Table
									limit="5"
									headData={fieldsDowntime}
									renderHead={(item, index) => renderOrderHead(item, index)}
									bodyData={downtimeListData}
									renderBody={(item, index) => renderOrderBodyDownTime(item, index)}
								/>
							) : (
								<p>No Records were found</p>
							)}
						</div>
						<div style={{ paddingBottom: "1rem" }}></div>
						<div className="card" style={{ position: "relative", minHeight: "20vh" }}>
							<h2 style={{ textAlign: "left", paddingBottom: "1rem" }}>Slow Speed</h2>
							{loading ? (
								<Table
									limit="5"
									headData={fieldsSlowSpeed}
									renderHead={(item, index) => renderOrderHead(item, index)}
									bodyData={slowSpeedListData}
									renderBody={(item, index) => renderOrderBodySlowRun(item, index)}
								/>
							) : (
								<p>No Records were found</p>
							)}
						</div>
						<div style={{ paddingBottom: "6rem" }}></div>
					</div>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default Administration;
