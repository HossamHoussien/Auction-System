import axios from "axios";

export default class Repository {
	static getItems(current_page = 1) {
		return new Promise((resolve, reject) => {
			let page = current_page === 1 ? "" : `?page=${current_page}`;

			axios.get(`${process.env.REACT_APP_API_ROUTE}/api/items${page}`).then((res) => {
				resolve(res.data);
			});
		});
	}

	static getItemDetails(item_id) {
		return new Promise((resolve, reject) => {
			axios.get(`${process.env.REACT_APP_API_ROUTE}/api/items/${item_id}`).then((res) => {
				resolve(res.data);
			});
		});
	}

	static bid(item_id, bid_amount, auto_biding = false) {
		return new Promise((resolve, reject) => {
			axios({
				method: "POST",
				url: `${process.env.REACT_APP_API_ROUTE}/api/biding`,
				data: { item_id, bid_amount, auto_biding },
			}).then((res) => {
				resolve(res.data);
			});
		});
	}
	static search(keyword) {
		return new Promise((resolve, reject) => {
			axios({
				method: "POST",
				url: `${process.env.REACT_APP_API_ROUTE}/api/search`,
				data: { keyword },
			}).then((res) => {
				resolve(res.data);
			});
		});
	}
	static storeAutoBidingConfig(auto_biding_amount) {
		return new Promise((resolve, reject) => {
			axios({
				method: "POST",
				url: `${process.env.REACT_APP_API_ROUTE}/api/autobiding/settings`,
				data: { auto_biding_amount },
			}).then((res) => {
				resolve(res.data);
			});
		});
	}
}
