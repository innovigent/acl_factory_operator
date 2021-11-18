import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import axios from "axios";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Administration = () => {
	const [downtimeListData, setDowntimeListData] = useState([]);
	const [slowSpeedListData, setSlowSpeedListData] = useState([]);
	const [loading, setLoading] = useState(true);
	const headers = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("device-token")}`,
		},
	};

	useEffect(() => {
		getTableData();
	}, []);

	const getTableData = async () => {
		try {
			const res1 = await axios.get(
				`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${localStorage.getItem(
					"productionrunId"
				)}/getall`,
				headers
			);
			const res2 = await axios.get(
				`https://acl-automation.herokuapp.com/api/v1/slowSpeedDetection/${localStorage.getItem(
					"productionrunId"
				)}/getListSlowspeed`,
				headers
			);
			console.log(res1.data);
			console.log(res2.data);
			setDowntimeListData(res1.data.data.productRunLog);
			setSlowSpeedListData(res2.data.data.productRunLog);
			setLoading(false);
		} catch (error) {
			console.log(error.response);
		}
	};

	const fieldsDowntime = [
		"ID",
		"Production Order Code",
		"Product Code",
		"Start Time",
		"End Time",
		"Down Time Case",
		"Status",
		"Action",
	];
	const fieldsSlowSpeed = [
		"ID",
		"Production Order Code",
		"Product Code",
		"Start Time",
		"End Time",
		"Slow Speed Case",
		"Status",
		"Action",
	];

	const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

	const renderOrderBodyDownTime = (item, index) => (
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.productionOrders ? item.productionOrders.productionorderCode : ""}</td>
			<td>{item.productionOrders ? item.productionOrders.productInfos.productCode : ""}</td>
			<td>{item.downtimeStartTime}</td>
			<td>{item.downtimeEndTime}</td>
			<td>{item.specialCases ? item.specialCases.name : ""}</td>
			<td>
				<Badge
					content={item.status.name}
					type={
						item.status.name === "Operator-Entered" || item.status.name === "Transfer"
							? "warning"
							: item.status.name === "Executive-Entered"
							? "success"
							: "primary"
					}
				/>
			</td>
			{item.status.name === "Operator-Entered" ? (
				<td>
					<Link to={{ pathname: "/Downtime", state: { id: item.id } }}>
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
							Submit
						</button>
					</Link>
				</td>
			) : item.status.name === "Created" ? (
				<td>
					<Link to={{ pathname: "/Downtime", state: { id: item.id } }}>
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
							Submit
						</button>
					</Link>
				</td>
			) : item.status.name === "Transfer" ? (
				<td>
					<Link to={{ pathname: "/Downtime", state: { id: item.id } }}>
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
							Transfer{" "}
						</button>
					</Link>
				</td>
			) : (
				""
			)}
		</tr>
	);

	const renderOrderBodySlowRun = (item, index) => (
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.productionRuns ? item.productionRuns.productionorders.productionorderCode : ""}</td>
			<td>{item.productionRuns ? item.productionRuns.productInfos.productCode : ""}</td>
			<td>{item.slowrunStartTime}</td>
			<td>{item.slowrunEndTime}</td>
			<td>{item.specialcases ? item.specialcases.name : ""}</td>
			<td>
				<Badge
					content={item.status.name}
					type={
						item.status.name === "Operator-Entered" || item.status.name === "Transfer"
							? "warning"
							: item.status.name === "Executive-Entered"
							? "success"
							: "primary"
					}
				/>
			</td>
			{item.status.name === "Operator-Entered" ? (
				<td>
					<Link to={{ pathname: "/Downtime", state: { id: item.id } }}>
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
							Submit
						</button>
					</Link>
				</td>
			) : item.status.name === "Created" ? (
				<td>
					<Link to={{ pathname: "/Downtime", state: { id: item.id } }}>
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
							Submit
						</button>
					</Link>
				</td>
			) : item.status.name === "Transfer" ? (
				<td>
					<Link to={{ pathname: "/Downtime", state: { id: item.id } }}>
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
							Transfer{" "}
						</button>
					</Link>
				</td>
			) : (
				""
			)}
		</tr>
	);

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
					<div className="full-height col-10">
						<div className="card" style={{ position: "relative", minHeight: "20vh" }}>
							<h2 style={{ textAlign: "left", paddingBottom: "1rem" }}>Downtime</h2>
							{downtimeListData.length > 0 ? (
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
							{slowSpeedListData.length > 0 ? (
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
