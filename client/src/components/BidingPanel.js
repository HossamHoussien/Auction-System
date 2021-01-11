import React, { useState, useEffect } from "react";
import HistoryCard from "./HistoryCard";
import EmptyIcon from "./EmptyIcon";
export default function BidingPanel({ bids }) {
	if (bids.length === 0) {
		return (
			<div className="biding-panel empty">
				<EmptyIcon message="No bids added yet. Beat them to it!" />
			</div>
		);
	}
	return (
		<div className="biding-panel">
			<ul>
				{bids.map((bid) => (
					<HistoryCard bid={bid} key={bid.id} />
				))}
			</ul>
		</div>
	);
}
