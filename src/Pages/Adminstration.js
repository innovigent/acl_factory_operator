import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { css } from "@emotion/css";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import { useHistory } from "react-router-dom";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";
import { HashLoader } from "react-spinners";
import AuthModel from "../components/modals/AuthModel";

const SingleValue = ({ cx, getStyles, selectProps, data, isDisabled, className, ...props }) => {
	console.log(props);
	return (
		<div
			className={cx(
				css(getStyles("singleValue", props)),
				{
					"single-value": true,
					"single-value--is-disabled": isDisabled,
				},
				className
			)}
		>
			<div>{selectProps.getOptionLabel(data)}</div>
		</div>
	);
};

const Administration = () => {
	const history = useHistory();
	const [listData, setListData] = useState({ lists: [] });
	const [text, setText] = useState("");
	const epfNo = localStorage.getItem("epfno");
	const [productionId, setproductionId] = useState("");
	const [productID, setProductID] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);
	const [podata, setpodata] = useState([]);
	const [authModal, setAuthModal] = useState(false);
	const community = localStorage.getItem("community");

	//
	// useEffect(()=>{
	//     setLoading(true)
	//     axios(txt).then(res => setText(res.data)); // This will have your text inside data attribute
	// },[])

	const sample = [
		{ id: 1, name: "John" },
		{ id: 2, name: "Doe" },
		{ id: 3, name: "Jane" },
		{ id: 4, name: "Doe" },
		{ id: 4, name: "Doe" },
		{ id: 4, name: "Doe" },
	];

	const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

	const renderOrderBody = (item, index) => (
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.name}</td>
		</tr>
	);

	const fieldsDowntime = ["ID", "Start Time", "End Time", "Down Time Case", "Status"];
	const fieldsSlowSpeed = ["ID", "Start Time", "End Time", "Status"];

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const token = await axios(txt);

			const tokentxt = token.data;
			setText(token.data);
			setLoading(false);
		};
		const fetchData1 = async () => {
			setLoading(true);

			const token = await axios(txt);

			const tokentxt = token.data;
			const headers = {
				headers: {
					Authorization: `Bearer ${tokentxt}`,
				},
			};
			const result = await axios(
				`https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/listproductorderIPC/${tokentxt}/getall`,
				headers
			);
			console.log(result.data);
			setListData({ lists: result.data.data.productionOrders });
			setLoading(false);
		};

		fetchData();
		fetchData1();
	}, []);

	let options = listData.lists.map(function (city) {
		return { value: city.id, label: city.productionorderCode };
	});

	const submit = async e => {
		e.preventDefault();
		const token = await axios(txt);

		const tokentxt = token.data;
		const headers = {
			headers: {
				Authorization: `Bearer ${tokentxt}`,
			},
		};
		setErr("");
		try {
			const body = { epfNo, productionId };

			//! previous route - https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/1/create
			const loginResponse = await axios.post(
				`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${community}/create`,
				body,
				headers
			);
			console.log(loginResponse.data);
			localStorage.setItem("productionrunId", loginResponse.data.data.id);
			history.push("/Home");
		} catch (err) {
			err.response.data.message && setErr(err.response.data.message);
		}
	};

	function removeDuplicates(arr) {
		arr.forEach(value => podata.push({ value: value.id, label: value.productionorderCode }));
		console.log(podata);
	}

	const handleChange = (newValue: any, actionMeta: any) => {
		let value = newValue.value;
		setproductionId(value);
		console.log(listData.lists, value);
		const selectedID = listData.lists.filter(item => item.id === value);
		console.log(selectedID);
		setProductID(selectedID[0].productInfos ? selectedID[0].productInfos.productCode : "");
	};

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
				<HashLoader loading={loading} size={150} />
			</div>
		);
	}

	return (
		<>
			{authModal && <AuthModel setAuthModal={setAuthModal} execute={submit} />}
			<div className="layout__content-main">
				<div className="position">
					<div className="page-header">Administration</div>
					<div className="full-height col-8">
						<div style={{ padding: "0 2rem" }}>
							{err ? (
								<Alert severity="error">
									<AlertTitle>Error</AlertTitle>
									{err}
								</Alert>
							) : null}
						</div>
						<div className="card" style={{ position: "relative", minHeight: "20vh" }}>
							<h2 style={{ textAlign: "left", paddingBottom: "1rem" }}>Downtime</h2>
							{loading ? (
								""
							) : // <Spinner />
							true ? (
								<Table
									limit="5"
									headData={fieldsDowntime}
									renderHead={(item, index) => renderOrderHead(item, index)}
									bodyData={sample}
									renderBody={(item, index) => renderOrderBody(item, index)}
								/>
							) : (
								""
								// <Success message="No vehicles were found" style={{ top: "50%", left: "3%" }} />
							)}
						</div>
						<div style={{ paddingBottom: "1rem" }}></div>
						<div className="card" style={{ position: "relative", minHeight: "20vh" }}>
							<h2 style={{ textAlign: "left", paddingBottom: "1rem" }}>Slow Speed</h2>
							{loading ? (
								""
							) : // <Spinner />
							true ? (
								<Table
									limit="5"
									headData={fieldsSlowSpeed}
									renderHead={(item, index) => renderOrderHead(item, index)}
									bodyData={sample}
									renderBody={(item, index) => renderOrderBody(item, index)}
								/>
							) : (
								""
								// <Success message="No vehicles were found" style={{ top: "50%", left: "3%" }} />
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
