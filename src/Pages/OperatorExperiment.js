import React, { useEffect, useState, useRef } from "react";
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { makeStyles } from "@material-ui/core/styles";
import { css } from "@emotion/css";
import TopNav from "../components/topnav/TopNav";
// import txt from "D:/Innovigent/ACL Automation/acl-factory-operator-frontend/src/token.txt";

function createData(name, empty) {
	return { name, empty };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

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

const ProductOrder = () => {
	const classes = useStyles();
	const [uuid, setUuid] = useState("");

	// create a preview as a side effect, whenever selected file is changed

	// function validateForm() {
	//     return email.length > 0 && password.length > 0;
	// }
	// const handleChange = (event) => {
	//     setType(event.target.value);
	// };
	// const imagehandleChange = (event) => {
	//     setImage(event.target.files[0]);
	// };

	function handleSubmit(event) {
		event.preventDefault();
	}

	// const onSelectFile = e => {
	//     if (!e.target.files || e.target.files.length === 0) {
	//         setSelectedFile(undefined)
	//         return
	//     }

	//     // I've kept this example simple by using the first image instead of multiple
	//     setSelectedFile(e.target.files[0])
	// }

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

							<div className="textFieldContainer1">
								<label>Product Order No.</label>
								<input
									type="text"
									autoFocus
									placeholder=""
									value={uuid}
									onChange={e => setUuid(e.target.value)}
								/>
							</div>

							<div className="textFieldContainer1">
								<label>Operator Epf No.</label>
								<input
									type="text"
									autoFocus
									placeholder=""
									value={uuid}
									onChange={e => setUuid(e.target.value)}
								/>
							</div>

							<div className="textFieldContainer1"></div>
							{/* to make space*/}
							<div className="textFieldContainer1"></div>
							{/* to make space*/}

							<button onClick={handleSubmit} className="submita">
								submit
							</button>

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

export default ProductOrder;
