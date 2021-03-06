import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { HashLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import axios from "axios";

import DropdownWithButton from "../components/dropdown/DropdownWithButton";
import OptionModal from "../components/modals/OptionModal";
import TopNav from "../components/topnav/TopNav";

import Image from "../assets/images/product-line.png";

const Home = () => {
	const [listData, setListData] = useState({ lists: [] });
	const [err, setErr] = useState("");
	const [status, setstatus] = useState("");
	const [loading, setLoading] = useState(true);
	const [faultDetectionData, setFaultDetectionData] = useState({});
	const productionrunId = localStorage.getItem("productionrunId");
	const [optionModal, setOptionModal] = useState(false);
	const history = useHistory();

	const detectFaults = async () => {
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};

		try {
			const res = await axios.get(
				`https://acl-automation.herokuapp.com/api/v1/productionRun/${productionrunId}/faultIdentification`,
				headers
			);

			if (res.status === 200) {
				setFaultDetectionData({
					speed: res.data.data.allData.machineSpeed,
					output: res.data.data.allData.outputQuantity,
				});
				setstatus(res.data.data.allData.status.key);

				setTimeout(() => {
					if (res.data.data.allData.status.key === "slowrun" && res.data.data.slowrun.length > 0) {
						localStorage.setItem("slowRunId", res.data.data.slowrun[0].id);
						history.push({
							pathname: "/SlowDownSpeed",
							state: { data: res.data.data },
						});
					} else if (
						res.data.data.allData.status.key === "downtime" &&
						res.data.data.downtime.length > 0
					) {
						localStorage.setItem("downtimeId", res.data.data.downtime[0].id);
						history.push({ pathname: "/Downtime", state: { data: res.data.data } });
					}
				}, 8000);
			}
		} catch (err) {
			console.log(err.response);
			setErr("Something went wrong while receiving data");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const headers = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("device-token")}`,
					},
				};
				const result = await axios(
					`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${productionrunId}/getall`,
					headers
				);

				if (result.status === 200) {
					setListData({ lists: result.data.data.productionOrders });
					setLoading(false);
				}
			} catch (err) {
				console.log(err.response);
				window.location.href = "/Changeover";
			}
		};

		const interval = setInterval(() => {
			detectFaults();
			fetchData();
		}, 5000);

		detectFaults();
		fetchData();

		return () => clearInterval(interval);
	}, []);

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
				<HashLoader loading={loading} size={150} color="#fe9843" />
			</div>
		);
	}

	return (
		<>
			<img src={Image} alt="factory" className="login-image product-line" />
			<div id="container">
				{optionModal && <OptionModal setOptionModal={setOptionModal} data={faultDetectionData} />}
				<div className="position">
					<h1 className="page-header">Home</h1>
					<>
						<div className="card full-height col-6">
							{err ? (
								<Alert severity="error">
									<AlertTitle>Error</AlertTitle>
									{err}
								</Alert>
							) : null}
							{listData.lists.map((country, index) => (
								<>
									<div className="textFieldContainer1" id={index}>
										<label htmlFor="epf">Production Order Code</label>
										<input
											className="a"
											placeholder=""
											type="text"
											name=""
											value={localStorage.getItem("productionOrderCode")}
											disabled
										/>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="epf">Product Name</label>
										<input
											className="a"
											placeholder=""
											type="text"
											name=""
											value={localStorage.getItem("productDetails")}
											disabled
										/>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="epf">Operator Information</label>
										<input
											className="a"
											placeholder=""
											type="text"
											name=""
											value={
												localStorage.getItem("epfNo") + " - " + localStorage.getItem("operatorName")
											}
											disabled
										/>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="epf">Target Achieved</label>
										<div
											className={
												(parseFloat(listData.lists[0].outputQuantity) /
													parseFloat(listData.lists[0].productionorders.orderQuantity)) *
													100 ===
												100
													? "target success"
													: "target pending"
											}
											style={{
												width:
													(parseFloat(listData.lists[0].outputQuantity) /
														parseFloat(listData.lists[0].productionorders.orderQuantity)) *
														100 +
													"%",
											}}
										>
											<p style={{ whiteSpace: "nowrap" }}>
												{listData.lists.length > 0
													? (parseFloat(listData.lists[0].outputQuantity) /
															parseFloat(listData.lists[0].productionorders.orderQuantity)) *
															100 +
													  "%"
													: "Loading..."}
											</p>
										</div>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="epf">Status</label>
										<div
											className={
												status === "downtime" || status === "slowrun"
													? "status stopped indicator"
													: "status success"
											}
										>
											<p>
												{status === "running"
													? "Running"
													: status === "slowrun"
													? "Slow Running"
													: status === "downtime"
													? "Stopped"
													: status === "completedrun"
													? "Complete"
													: "Loading.."}
											</p>
										</div>
									</div>
									<div className="left-corner" onClick={() => setOptionModal(true)}>
										<DropdownWithButton icon="bx bx-dots-vertical-rounded" title="Options" />
									</div>
								</>
							))}
						</div>
					</>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default Home;
