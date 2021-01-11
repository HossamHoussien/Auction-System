import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import Sidebar from "./../components/Sidebar";
import Repository from "../services/repository";
import ItemCard from "../components/ItemCard";
import { useQuery } from "./../hooks/index";
import "./home.scss";

export default function HomePage() {
	const query = useQuery();
	const [items, setItems] = useState([]);
	const [paginator, setPaginator] = useState({});
	const initialIndex = query.get("page") || 1;
	const [currentPage, setCurrentPage] = useState(initialIndex);

	useEffect(() => {
		Repository.getItems(currentPage).then((paginator) => {
			setItems(paginator.data);
			setPaginator(paginator);
		});
	}, [currentPage]);

	const paginate = (e, page) => {
		setCurrentPage(page);
	};

	return (
		<div className="home-page">
			<div className="sidebar-wrapper">
				<Sidebar setItems={setItems} setPaginator={setPaginator} setCurrentPage={setCurrentPage} />
			</div>
			<div className="items-wrapper">
				<div className="items-list">
					{items.map((item) => (
						<ItemCard item={item} key={item.id} />
					))}
				</div>

				<div className="pagination-wrapper">
					<BrowserRouter initialEntries={["/"]} initialIndex={0}>
						<Route>
							{({ location }) => {
								const query = new URLSearchParams(location.search);
								const page = parseInt(query.get("page") || "1", 10);
								return (
									<Pagination
										page={page}
										count={paginator.last_page}
										size="large"
										onChange={paginate}
										renderItem={(item) => <PaginationItem component={Link} to={`/${item.page === 1 ? "" : `?page=${item.page}`}`} {...item} />}
									/>
								);
							}}
						</Route>
					</BrowserRouter>
				</div>
			</div>
		</div>
	);
}
