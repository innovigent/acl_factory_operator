import React, { useEffect, useState, useRef } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { makeStyles } from "@material-ui/core/styles";
import { css } from "@emotion/css";
import TopNav from "../components/topnav/TopNav";
import moment from "moment";
import Table from "../components/table/Table";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { HashLoader } from "react-spinners";
import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

const fields = [
	"Production Order",
	"Production line",
	"Start time",
	"reason",
	"Reslove",
	"Report",
];

const rows = [
	{
		id: 1,
		firstName: "mujeeb",
		lastName: "singham",
		email: "chandulagayan@gmail.com",
		createdAt: "2021-07-16T10:38:11.002Z",
		updatedAt: "2021-07-16T10:38:11.002Z",
	},
	{
		id: 9,
		firstName: "Gayath",
		lastName: "Chandula",
		email: "chandulagayan1@gmail.com",
		createdAt: "2021-07-16T10:38:11.002Z",
		updatedAt: "2021-07-16T10:38:11.002Z",
	},
];

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

const SingleValue = ({
	cx,
	getStyles,
	selectProps,
	data,
	isDisabled,
	className,
	...props
}) => {
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

const ActionTable = () => {
	const history = useHistory();
	const [listData, setListData] = useState({ lists: [] });
	const macaddress = localStorage.getItem("macaddress");
	const productionrunId = localStorage.getItem("productionrunId");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const [reasonType, setreasonType] = useState("");

	const onUpdate = (item) => {
		history.push({
			pathname: "/Downtime",
			state: item,
		});
	};

	const onPush = (item) => {
		history.push({
			pathname: "/VerifyIssue",
			state: item,
		});
	};

	const onPushSlowdown = (item) => {
		history.push({
			pathname: "/VerifySlowdown",
			state: item,
		});
	};

	const renderOrderBody = (item, index) => (
		<tr key={index}>
			<td>{item.productionorderId}</td>
			<td>{item.downtime[0].productionRunId}</td>
			<td>{moment(item.downtimeStartTime).format("hh:mm:ss")}</td>
			<td>{item.downtime[0].reportedReasonId}</td>
			{reasonType === 2 ? (
				<td>
					<button
						className="usertblactivebutton"
						onClick={() => {
							onPushSlowdown(item);
						}}
					>
						<i className="bx bx-edit"></i>
					</button>
				</td>
			) : (
				<td>
					<button
						className="usertblactivebutton"
						onClick={() => {
							onPush(item);
						}}
					>
						<i className="bx bx-edit"></i>
					</button>
				</td>
			)}
			<td>
				<button
					className="usertblbutton"
					onClick={() => {
						onUpdate(item);
					}}
				>
					<i className="bx bxs-report"></i>
				</button>
			</td>
		</tr>
	);

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
					`https://acl-automation.herokuapp.com/api/v1/downtimecontroller/${tokentxt}/${productionrunId}/getall`,
					headers
				);
				console.log(result);
				setListData({ lists: result.data.data.productRunLog });

				if (listData.lists.length > 0) {
					setreasonType(
						result.data.data.productRunLog[0].downtime[0].reportedReasonId
					);
				}
				setLoading(false);
			} catch (err) {
				console.log(err.response);
				console.log(err);
			}
		};

		fetchData();
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
	}

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
			<div className="layout__content-main">
				<div className="position">
					<div className="card full-height">
						<div>
							<div className="textFieldContainer1">
								<div className="right-corner">Date:</div>
								<div className="left-corner">Status:</div>
							</div>
							<div className="textFieldContainer1"></div>
							{/* to make space*/}
							{listData.lists.length > 0 && reasonType ? (
								<Table
									limit="5"
									headData={fields}
									renderHead={(item, index) => renderOrderHead(item, index)}
									bodyData={listData.lists}
									renderBody={(item, index) => renderOrderBody(item, index)}
								/>
							) : (
								<p>No Data</p>
							)}
							<div className="textFieldContainer1"></div>
							{/* to make space*/}
							<div className="textFieldContainer1"></div>
							{/* to make space*/}
						</div>
					</div>
				</div>
				<TopNav />
			</div>
		</>
	);
};

export default ActionTable;
