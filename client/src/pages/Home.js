import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import ItemList from "./../components/ItemList";
import Repository from "../services/repository";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { DataGrid } from "@material-ui/data-grid";
import "./home.scss";
export default function HomePage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [paginator, setPaginator] = useState(null);
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const columns = [
		{ field: "id", headerName: "ID" },
		{
			field: "image",
			headerName: "Image",
			sortable: false,
			width: 120,
			renderCell: (params) => <img className="item-image" src={params.row.image_url} />,
		},
		{ field: "name", headerName: "Name", sortable: false, width: 300 },
		{ field: "description", headerName: "Description", sortable: false, width: 300 },
		{ field: "starting_price", headerName: "Starting Price" },
		{ field: "close_at", headerName: "Ends At", type: "dateTime" },
		{
			field: "actions",
			width: 150,
			headerName: "&npsp;",
			sortable: false,
			renderCell: (params) => (
				<strong>
					<Link to={`/items/${params.row.id}`}>
						<Button variant="contained" color="primary" size="small">
							Bid Now
						</Button>
					</Link>
				</strong>
			),
		},
	];

	function CustomPagination(props) {
		const { pagination, api } = props;

		return <Pagination color="primary" page={pagination.page} count={pagination.pageCount} onChange={(event, value) => api.current.setPage(value)} />;
	}

	const search = (event) => {
		let keyword = event.target.value.trim().toLowerCase();
		let regex = new RegExp(keyword, "gi");

		setFilteredItems(items.filter((item) => regex.test(item.name) || regex.test(item.description)));
	};
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			Repository.getItems(currentPage).then((paginator) => {
				setItems(paginator.data);
				setFilteredItems(paginator.data);
				setPaginator(paginator);
			});
		}

		return () => (mounted = false);
	}, [currentPage]);

	return (
		paginator && (
			<div style={{ width: "100%", height: "500px" }}>
				<TextField id="outlined-basic" label="Search items by name or description" variant="outlined" onChange={search} />

				<DataGrid
					rows={filteredItems}
					columns={columns}
					pageSize={10}
					rowHeight={100}
					rowCount={paginator.total}
					paginationMode="server"
					pagination
					disableColumnMenu
					loading={!items.length}
					disableSelectionOnClick
					components={{
						pagination: CustomPagination,
					}}
				/>
			</div>
		)
	);
}
