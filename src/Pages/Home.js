import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import DropdownWithButton from "../components/dropdown/DropdownWithButton";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";
import OptionModal from "../components/modals/OptionModal";

const Home = () => {
	const [listData, setListData] = useState({ lists: [] });
	const [err, setErr] = useState("");
	const [status, setstatus] = useState("");
	const [loading, setLoading] = useState(true);
	const macaddress = localStorage.getItem("macaddress");
	const productionrunId = localStorage.getItem("productionrunId");
	const epfNo = localStorage.getItem("epfno");
	const [stop, setStop] = useState(false);
	const [optionModal, setOptionModal] = useState(false);

	const notifications = [
		{
			icon: "bx bx-error",
			content: "BreakDown",
			route: "/OperatorBrakdown",
		},
		{
			icon: "bx bx-edit-alt",
			content: "Slow Speed",
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await axios(txt);

				const tokentxt = token.data;
				const headers = {
					headers: {
						Authorization: `Bearer ${tokentxt}`,
					},
				};
				const result = await axios(
					`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${productionrunId}/getall`,
					headers
				);
				console.log(result);
				setListData({ lists: result.data.data.productionOrders });
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const token = await axios(txt);

			const tokentxt = token.data;
			const headers = {
				headers: {
					Authorization: `Bearer ${tokentxt}`,
				},
			};

			try {
				const result = await axios(
					`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${productionrunId}/getall`,
					headers
				);
				console.log(result.data);
				setListData({ lists: result.data.data.productionOrders });
				setLoading(false);
			} catch (err) {
				console.log(err.response);
			}
		};
		fetchData();
	}, []);

	const renderNotificationItem = (item, index) => (
		<Link to={item.route} key={index}>
			<div className="notification-item" key={index}>
				<i className={item.icon}></i>
				<span>{item.content}</span>
			</div>
		</Link>
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
			<div id="container">
				{optionModal && <OptionModal setOptionModal={setOptionModal} />}
				<div className="position">
					<h1 className="page-header">Home</h1>
					<>
						<div className="card full-height col-6">
							{listData.lists.map((country, key) => (
								<>
									<div className="textFieldContainer1">
										<label htmlFor="epf">Production Order Code</label>
										<input
											className="a"
											placeholder=""
											type="text"
											name=""
											value={country.productionorderId}
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
											value={country.productInfos.productCode}
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
										<div className="target success">
											<p>100%</p>
										</div>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="epf">Status</label>
										<div className={stop ? "status stopped indicator" : "status success"}>
											<p>{stop ? "Stopped" : "Running"}</p>
										</div>
									</div>
									<div className="left-corner" onClick={() => setOptionModal(true)}>
										<DropdownWithButton
											icon="bx bx-dots-vertical-rounded"
											title="Options"
											contentData={notifications}
											renderItems={(item, index) => renderNotificationItem(item, index)}
										/>
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
