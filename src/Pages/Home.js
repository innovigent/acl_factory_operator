import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import Dropdown from "../components/dropdown/Dropdown";
import { Link } from "react-router-dom";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const Home = () => {
	const [listData, setListData] = useState({ lists: [] });
	const [err, setErr] = useState("");
	const [status, setstatus] = useState("");
	const [loading, setLoading] = useState(true);
	const macaddress = localStorage.getItem("macaddress");
	const productionrunId = localStorage.getItem("productionrunId");

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
			setListData({ lists: result.data.data.productionOrders });
			setLoading(false);
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
			const result = await axios(
				`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${productionrunId}/getall`,
				headers
			);
			setListData({ lists: result.data.data.productionOrders });
			setLoading(false);
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

	return (
		<>
			<div id="container">
				<div className="position">
					<>
						<div className="card full-height">
							{listData.lists.map((country, key) => (
								<>
									<div className="textFieldContainer1">
										{/* <div className="right-corner">Date:</div> */}
										<div className="left-corner">
											<Dropdown
												icon="bx bx-message-edit"
												contentData={notifications}
												renderItems={(item, index) =>
													renderNotificationItem(item, index)
												}
											/>
										</div>
										<div className="right-corner">Status:</div>
									</div>
									<div className="textFieldContainer1"></div>
									{/* to make space*/}

									<div className="textFieldContainer1">
										<label htmlFor="productionorder">
											<h1>Production Order</h1>
										</label>
										<label htmlFor="productionorder">
											<h2>{country.productionorderId}</h2>
										</label>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="productionorder">
											<h1>Product</h1>
										</label>
										<label htmlFor="productionorder">
											<h2>{country.productInfos.productCode}</h2>
										</label>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="productionorder">
											<h1>Machine speed</h1>
										</label>
										<label htmlFor="productionorder">
											<h2>{country.machineSpeed}</h2>
										</label>
									</div>
									<div className="textFieldContainer1">
										<label htmlFor="productionorder">
											<h1>Planned total</h1>
										</label>
										<label htmlFor="productionorder">
											<h2>{country.outputQuantity}</h2>
										</label>
									</div>

									<div className="textFieldContainer1"></div>
									{/* to make space*/}
									<div className="textFieldContainer1"></div>
									{/* to make space*/}
									<div className="textFieldContainer1"></div>
									{/* to make space*/}
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
