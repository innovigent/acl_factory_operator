import React, { useEffect, useState } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { css } from "@emotion/css";
import TopNav from "../components/topnav/TopNav";
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

const Changeover = () => {
	const history = useHistory();
	const [listData, setListData] = useState({ lists: [] });
	const [text, setText] = useState("");
	const epfNo = localStorage.getItem("epfno");
	const [productionId, setproductionId] = useState("");
	const [productID, setProductID] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const [podata, setpodata] = useState([]);
	const [authModal, setAuthModal] = useState(false);
	const community = localStorage.getItem("community");

	//
	// useEffect(()=>{
	//     setLoading(true)
	//     axios(txt).then(res => setText(res.data)); // This will have your text inside data attribute
	// },[])

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
					<div className="page-header">Change Over</div>
					<div className="card full-height col-6">
						<div style={{ padding: "0 2rem" }}>
							{err ? (
								<Alert severity="error">
									<AlertTitle>Error</AlertTitle>
									{err}
								</Alert>
							) : null}
							<div className="textFieldContainer1">
								<div className="right-corner">Date: {new Date().toDateString()}</div>
							</div>
							<div className="textFieldContainer1"></div>
							{/* to make space*/}
							<div className="textFieldContainer1">
								<label htmlFor="orderNo">Production Order Code</label>
								<CreatableSelect
									options={options}
									className="orderNo"
									components={{ SingleValue }}
									onChange={handleChange}
									isValidNewOption={() => false}
									// styles={customStyles}
									styles={{
										menu: (provided, state) => ({
											...provided,
											width: "90%",
											padding: 30,
										}),
										singleValue: (provided, state) => ({
											...provided,
											display: "flex",
											alignItems: "center",
											opacity: 0.5,
										}),
									}}
								/>
								{/*<input*/}
								{/*    className="a"*/}
								{/*    placeholder=""*/}
								{/*    type="text"*/}
								{/*    name=""*/}
								{/*    value={productionId}*/}
								{/*    onChange={(e) => setproductionId(e.target.value)}*/}
								{/*/>*/}
							</div>
							<div className="textFieldContainer1">
								<label htmlFor="epf">Product Name</label>
								<input className="a" placeholder="" type="text" name="" value={productID} />
							</div>
							<div className="textFieldContainer1">
								<label htmlFor="epf">Status</label>
								<div className="status pending">
									<p>Pending</p>
								</div>
							</div>
							{/* to make space*/}
							<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
								<button onClick={() => setAuthModal(true)} className="submita">
									Submit
								</button>
							</div>
							<div className="textFieldContiner1"></div>
							{/* to make space*/}
							<br />
						</div>
					</div>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default Changeover;
