import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BidingPanel from "./../components/BidingPanel";
import "./item.scss";
import Repository from "./../services/repository";
import Timer from "./../components/Timer";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function ItemPage() {
	let { id } = useParams();
	let [item, setItem] = useState(null);
	let [bidValue, setBidValue] = useState(0);
	let [autoBid, setAutoBid] = useState(false);

	useEffect(() => {
		Repository.getItemDetails(id).then((item) => {
			setItem(item);
			setBidValue(item.min_bid);
		});
	}, [id]);

	const handleBidChange = (event) => {
		const reg = /^\d*$/;
		const value = event.target.value;

		if (!reg.test(value)) {
			event.preventDefault();
			return;
		}

		setBidValue(value);
	};

	const handleAutoBidChange = (event) => {
		const isChecked = event.target.checked;
		console.log(isChecked);
		setAutoBid(isChecked);
	};

	const preventDefaultFormSubmit = (event) => event.preventDefault();

	const validateBid = (bid) => {
		const value = Number(bid);
		const isSafeInteger = value < Number.MAX_SAFE_INTEGER && value >= item.min_bid;
		return isSafeInteger;
	};

	const submitBiding = () => {
		const isValidBid = validateBid(bidValue);

		if (!isValidBid) {
			return false;
		}

		Repository.bid(item.id, bidValue, autoBid);
	};

	return (
		item && (
			<div className="wrapper">
				<Timer date={item.close_at} />
				<div className="item-card">
					<div className="item-details">
						<div className="img">
							<img src={item.image_url} style={{ width: "200px" }} />
						</div>
						<div className="details">
							<h4>{item.name}</h4>
							<p>{item.description}</p>
							<span>Bid started at {item.starting_price}$</span>
						</div>
						<div className="bid-form">
							<form onSubmit={preventDefaultFormSubmit}>
								<FormControl fullWidth variant="outlined" error={!validateBid(bidValue)}>
									<InputLabel htmlFor="outlined-adornment-amount">Bid Amount</InputLabel>
									<OutlinedInput value={bidValue} onChange={handleBidChange} startAdornment={<InputAdornment position="start">$</InputAdornment>} labelWidth={60} />
								</FormControl>

								<FormControlLabel control={<Checkbox checked={autoBid} color="primary" onChange={handleAutoBidChange} name="auto_bid" />} label="Enable Auto-biding?" />

								<Button variant="contained" color="primary" size="small" disabled={!item.can_bid || !validateBid(bidValue)} onClick={submitBiding}>
									Submit Bid
								</Button>
							</form>
						</div>
					</div>
				</div>
				<div className="biding-panel">
					<BidingPanel />
				</div>
			</div>
		)
	);
}
