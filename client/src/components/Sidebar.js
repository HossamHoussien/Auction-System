import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Repository from "../services/repository";

export default function Sidebar({ setItems, setPaginator, setCurrentPage }) {
	const [current_search, setCurrentSearch] = useState("");

	const resetSearch = () => {
		setCurrentSearch("");
		setCurrentPage(1);
	};

	const search = () => {
		setCurrentSearch(current_search);

		let keyword = current_search.trim().toLowerCase();
		Repository.search(keyword.toLowerCase()).then((paginator) => {
			setItems(paginator.data);
			setPaginator(paginator);
			setCurrentPage(null);
		});
	};

	return (
		<div className="filters">
			<div className="search-wrapper">
				<TextField fullWidth label="Search items by name or description" variant="filled" value={current_search} onChange={(e) => setCurrentSearch(e.target.value)} />
				<div style={{ textAlign: "center" }}>
					<Button variant="outlined" color="primary" size="small" style={{ margin: "1rem 0.5rem" }} onClick={search}>
						Search
					</Button>

					<Button variant="outlined" size="small" style={{ margin: "0.5rem" }} onClick={resetSearch}>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
}
