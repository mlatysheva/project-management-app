import React from "react";
import { TextField } from "@mui/material";

interface inputProps {
	name: string;
	label: string;
	value: string;
	helperText: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField(props: inputProps) {
	const { name, label, value, helperText, onChange } = props;
	return (
		<TextField
			variant="outlined"
			label={label}
			name={name}
			defaultValue={value}
			onChange={onChange}
			error
			helperText={helperText}
		/>
	);
}
export default InputField;
