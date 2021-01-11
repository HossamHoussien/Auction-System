import React from "react";
import { Avatar, Card, CardHeader, CardMedia, CardActions, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles(() => ({
	root: {
		width: "20%",
		minWidth: "300px",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	avatar: {
		backgroundColor: red[500],
	},
	actions: {
		justifyContent: "space-between",
	},
}));

export default function ItemCard({ item }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				title={item.name}
				subheader={new Date(item.close_at).toDateString()}
			/>

			<CardMedia className={classes.media} image={item.image_url} title={item.name} />

			<CardActions disableSpacing className={classes.actions}>
				<IconButton aria-label="Item Price">
					<AttachMoneyIcon /> {item.starting_price}
				</IconButton>

				<Button href={`/items/${item.id}`} variant="contained" color="primary">
					Bid Now
				</Button>
			</CardActions>
		</Card>
	);
}
