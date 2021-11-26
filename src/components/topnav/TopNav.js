import React from "react";
import "./topnav.css";
import "../sidebar/sidebar.css";
import { Link } from "react-router-dom";

const sidebar_items = [
	{
		display_name: "Change Over",
		route: "/Changeover",
		icon: "bx bx-transfer-alt",
	},
	{
		display_name: "Home",
		route: "/Home",
		icon: "bx bx-home-alt",
	},
	{
		display_name: "Administration",
		route: "/Administration",
		icon: "bx bx-collection",
	},
	{
		display_name: "Downtime",
		route: "/Downtime",
		icon: "bx bx-time",
	},
	{
		display_name: "Slow Run",
		route: "/SlowDownSpeed",
		icon: "bx bx-down-arrow-circle",
	},
	{
		icon: "bx bx-log-out-circle bx-rotate-180",
		route: "/Home",
		display_name: "Logout",
	},
];

function ClearLocalStorage() {
	localStorage.clear();
	window.location.href = "/";
}

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
				{sidebar_items.map((item, index) =>
					item.display_name === "Logout" ? (
						<Link
							onClick={() => {
								if (window.confirm("Are you sure you want to logout?")) {
									ClearLocalStorage();
								}
							}}
							key={index}
						>
							<SidebarItem
								title={item.display_name}
								icon={item.icon}
								active={index === activeItem}
							/>
						</Link>
					) : (
						<Link to={{ pathname: item.route, state: {} }} key={index}>
							<SidebarItem
								title={item.display_name}
								icon={item.icon}
								active={index === activeItem}
							/>
						</Link>
					)
				)}
			</div>
		</div>
	);
};

export default Topnav;
