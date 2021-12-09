import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { HashLoader } from "react-spinners";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import axios from "axios";

import TopNav from "../components/topnav/TopNav";
import AuthModel from "../components/modals/AuthModel";
import SmallSpinner from "../components/spinner/SmallSpinner";

import Image from "../assets/images/product-line.png";

const SingleValue = ({ cx, getStyles, selectProps, data, isDisabled, className, ...props }) => {
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
	const epfNo = localStorage.getItem("epfno");
	const [productionId, setproductionId] = useState("");
	const [productID, setProductID] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const [productionOrderCode, setProductionOrderCode] = useState("");
	const [authModal, setAuthModal] = useState(false);
	const [btnState, setBtnState] = useState(false);
	const community = localStorage.getItem("community");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		const result = await axios(
			`https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/listproductorderIPC/${localStorage.getItem(
				"device-token"
			)}/getall`,
			headers
		);
		setListData({ lists: result.data.data.productionOrders });
		setLoading(false);
	};

	let options = listData.lists.map(function (city) {
		return { value: city.id, label: city.productionorderCode };
	});

	const submit = async (e, id) => {
		e.preventDefault();
		setBtnState(true);
		setErr("");

		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("device-token")}`,
			},
		};
		try {
			const body = { epfNo: id, productionId };

			const loginResponse = await axios.post(
				`https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${community}/create`,
				body,
				headers
			);

			localStorage.setItem("productionrunId", loginResponse.data.data.id);
			localStorage.setItem("productionOrderCode", productionOrderCode);
			localStorage.setItem("productDetails", productID);
			localStorage.setItem("productionId", productionId);
			history.push("/Home");
		} catch (err) {
			setErr("Something went wrong");
			setBtnState(false);
		}
	};

	const handleChange = (newValue, actionMeta) => {
		let value = newValue.value;
		setproductionId(value);
		const selectedID = listData.lists.filter(item => item.id === value);
		setProductID(
			selectedID[0].productInfos
				? selectedID[0].productInfos.productCode +
						" " +
						selectedID[0].productInfos.productDescription
				: ""
		);
		setProductionOrderCode(selectedID[0].productionorderCode);
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
				<HashLoader loading={loading} size={150} color="#fe9843" />
			</div>
		);
	}

	return (
		<>
			<img src={Image} alt="factory" className="login-image product-line" />
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
							<div className="textFieldContainer1">
								<label htmlFor="orderNo">Production Order Code</label>
								<CreatableSelect
									options={options}
									className="orderNo"
									components={{ SingleValue }}
									onChange={handleChange}
									isValidNewOption={() => false}
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
							</div>
							<div className="textFieldContainer1">
								<label htmlFor="epf">Product Name</label>
								<input
									className="a"
									placeholder=""
									type="text"
									name=""
									value={productID}
									disabled
								/>
							</div>
							<div className="textFieldContainer1">
								<label htmlFor="epf">Status</label>
								<div className="status pending">
									<p>Pending</p>
								</div>
							</div>
							<div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
								<button
									onClick={() => {
										if (epfNo === "" || productionId === "") {
											return setErr("Please fill all the fields");
										}
										setErr("");
										setAuthModal(true);
									}}
									className="submita"
								>
									{btnState ? <SmallSpinner /> : "Submit"}
								</button>
							</div>
							<div className="textFieldContiner1"></div>
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
