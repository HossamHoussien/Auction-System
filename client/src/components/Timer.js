import React, { useState, useEffect } from "react";
import "./timer.scss";

export default function Timer(props) {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		getTimeDifference(props.date);
		let intervalHandler = setInterval(() => getTimeDifference(props.date), 1000);

		return () => clearInterval(intervalHandler);
	}, []);

	function leadingZero(num) {
		return num < 10 && num >= 0 ? "0" + num : num;
	}

	function getTimeDifference(date) {
		const time = Date.parse(date) - Date.parse(new Date());
		const days = Math.floor(time / (1000 * 60 * 60 * 24));
		const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((time / 1000 / 60) % 60);
		const seconds = Math.floor((time / 1000) % 60);
		setDays(days);
		setHours(hours);
		setMinutes(minutes);
		setSeconds(seconds);
	}

	return (
		<div className="counters-wrapper">
			<div className="clock">
				<p className="digits">{leadingZero(days)}</p>
				<p className="label">{days === 1 ? "day" : "days"}</p>
			</div>
			<div className="clock">
				<p className="digits">{leadingZero(hours)}</p>
				<p className="label">{days === 1 ? "hour" : "hours"}</p>
			</div>
			<div className="clock">
				<p className="digits">{leadingZero(minutes)}</p>
				<p className="label">{days === 1 ? "minute" : "minutes"}</p>
			</div>
			<div className="clock">
				<p className="digits">{leadingZero(seconds)}</p>
				<p className="label">{days === 1 ? "second" : "seconds"}</p>
			</div>
		</div>
	);
}
