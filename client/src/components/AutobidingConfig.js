import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import Repository from "../services/repository";

export default function AutobidingConfig({ open, setOpen }) {
	const [max_amount, setMaxAmount] = useState(0);

	const handleClose = () => {
		setOpen(false);
	};

	const saveConfig = () => {
		Repository.storeAutoBidingConfig(max_amount).then((res) => (res.status ? setMaxAmount(res.auto_biding_amount) : setMaxAmount(res.previous_amount)));
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Auto-biding Settings</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter the MAX. amount to enable auto-biding with.</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						value={max_amount}
						onChange={(e) => setMaxAmount(e.target.value)}
						label="Max. Amount"
						type="number"
						fullWidth
						inputProps={{ min: 1 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={saveConfig} variant="contained" color="primary">
						Save
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
