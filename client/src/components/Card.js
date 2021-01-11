import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
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

export default function RecipeReviewCard({ item }) {
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
