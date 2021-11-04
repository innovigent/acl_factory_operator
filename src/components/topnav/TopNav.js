import React, { useContext } from "react";
import "./topnav.css";
import "../sidebar/sidebar.css";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";

const sidebar_items1 = [
	{
		display_name: "Logout",
		route: "/Changeover",
		onClick: ClearLocalStorage,
		icon: "bx bx-log-out",
	},
];

const sidebar_items = [
	{
		display_name: "Change Over",
		route: "/Changeover",
		icon: "bx bx-transfer-alt",
	},
	{
		display_name: "Down time",
		route: "/Downtime",
		icon: "bx bx-time",
	},
	{
		display_name: "Home",
		route: "/Home",
		icon: "bx bx-home-alt",
	},
	{
		display_name: "Operator Action",
		route: "/OperatorActionTable",
		icon: "bx bx-pointer",
	},
	{
		display_name: "Administration",
		route: "/Administration",
		icon: "bx bx-collection",
	},
];

const notifications = [
	{
		content: "Operator Experiment",
		route: "/OperatorExperiment",
		icon: "bx bx-category-alt",
	},
	{
		content: "Slow down",
		route: "/SlowDownSpeed",
		icon: "bx bx-category-alt",
	},
	{
		content: "Status",
		route: "/StatusChanged",
		icon: "bx bx-category-alt",
	},
	{
		display_name: "Fault Detection",
		route: "/FaultDetection",
		icon: "bx bx-category-alt",
	},
];

const user_menu = [
	{
		icon: "bx bx-user",
		content: "Profile",
	},
	{
		icon: "bx bx-wallet-alt",
		content: "My Wallet",
	},
	{
		icon: "bx bx-cog",
		content: "Settings",
	},
	{
		icon: "bx bx-log-out-circle bx-rotate-180",
		onClick: ClearLocalStorage,
		route: "/Home",
		content: "Logout",
	},
];

const curr_user = {
	display_name: "Tuat Tran",
	// image: user_image
};

function ClearLocalStorage() {
	localStorage.clear();
}

const renderNotificationItem = (item, index) => (
	<Link to={item.route} key={index}>
		<div className="notification-item" key={index}>
			<i className={item.icon}></i>
			<span>{item.content}</span>
		</div>
	</Link>
);

const renderUserToggle = user => (
	<div className="topnav__right-user">
		<div className="topnav__right-user__image">
			<img src={user.image} alt="" />
		</div>
		<div className="topnav__right-user__name">{user.display_name}</div>
	</div>
);

const renderUserMenu = (item, index) => (
	<Link to={item.route} key={index}>
		<div className="notification-item" onClick={item.onClick}>
			<i className={item.icon}></i>
			<span>{item.content}</span>
		</div>
	</Link>
);

const SidebarItem = props => {
	const active = props.active ? "active" : "";

	return (
		<div className="sidebar__item">
			<div className={`sidebar__item-inner ${active}`}>
				<i className={props.icon}></i>
				<span>{props.title}</span>
			</div>
		</div>
	);
};

const Topnav = () => {
	const activeItem = sidebar_items.findIndex(item => item.route === window.location.pathname);

	return (
		<div className="topnav">
			<div className="topnav__search">
				{sidebar_items.map((item, index) => (
					<Link to={item.route} key={index}>
						<SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
					</Link>
				))}
				{sidebar_items1.map((item, index) => (
					<Link to={item.route} key={index} onClick={item.onClick}>
						<SidebarItem
							title={item.display_name}
							icon={item.icon}
							//active={index === activeItem}
						/>
					</Link>
				))}
			</div>
			<div className="topnav__right">
				<div className="topnav__right-item">
					{/* dropdown here */}
					<Dropdown
						icon="bx bx-menu"
						contentData={notifications}
						renderItems={(item, index) => renderNotificationItem(item, index)}
						//renderFooter={() => <Link to='/'>View All</Link>}
					/>
				</div>
			</div>
		</div>
	);
};

export default Topnav;
