import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { MemoryRouter, Route } from "react-router";

import PaginationItem from "@material-ui/lab/PaginationItem";

import Repository from "../services/repository";
import Card from "./../components/Card";
import "./home.scss";
import { useQuery } from "../hooks";
export default function HomePage() {
	const [items, setItems] = useState([]);
	const [paginator, setPaginator] = useState({});
	const [currentPage, setCurrentPage] = useState(1);

	const search = (event) => {
		let keyword = event.target.value.trim().toLowerCase();
		Repository.search(keyword.toLowerCase()).then((paginator) => {
			setItems(paginator.data);
			setPaginator(paginator);
		});
		// setFilteredItems(items.filter((item) => regex.test(item.name) || regex.test(item.description)));
	};

	useEffect(() => {
		Repository.getItems(paginator.current_page).then((paginator) => {
			setItems(paginator.data);
			// setFilteredItems(paginator.data);
			setPaginator(paginator);
		});
	}, [currentPage]);

	return (
		<div>
			<div className="items-wrapper">
				<div className="serach-wrapper">
					<TextField fullWidth label="Search items by name or description" variant="filled" onChange={search} />
				</div>
				{items.map((item) => (
					<Card item={item} key={item.id} />
				))}
			</div>
			<div className="pagination-wrapper">
				<MemoryRouter initialEntries={["/"]} initialIndex={0}>
					<Route>
						{({ location }) => {
							const query = new URLSearchParams(location.search);
							const page = parseInt(query.get("page") || "1", 10);
							return (
								<Pagination
									page={page}
									count={paginator.last_page}
									renderItem={(item) => <PaginationItem component={Link} to={`/${item.page === 1 ? "" : `?page=${item.page}`}`} {...item} />}
								/>
							);
						}}
					</Route>
				</MemoryRouter>
				{/* <Pagination color="primary" page={paginator.current_page} count={paginator.last_page} onChange={(e, page) => setCurrentPage(page)} /> */}
			</div>
		</div>
	);
}
