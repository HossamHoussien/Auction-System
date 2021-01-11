import React from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

export default function BidingPanel({ bid }) {
	const conditionalElement = <Chip variant="outlined" style={{ fontSize: "0.7rem" }} size="small" label="Auto Bid" color="primary" onDelete={() => {}} deleteIcon={<DoneIcon />} />;
	return (
		<div className="history-card">
			<div className="content">
				<span className="user">{bid.user.name}</span>
				<span className="text"> made a bid at </span>
				<span className="amount">{bid.amount}$</span>
			</div>
			{bid.auto_biding ? conditionalElement : ""}
		</div>
	);
}
