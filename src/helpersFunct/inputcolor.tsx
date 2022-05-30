import { FormEvent, KeyboardEvent } from "react";

export function applyColorLogin(e: FormEvent<HTMLFormElement | HTMLInputElement>) {
	let text = (e.target as HTMLInputElement).value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я0-9]{4}/g);
	if (isGreen.test(text)) {
		(e.target as HTMLInputElement).className = "signup__input green";
	} else if (text.length > 0) {
		(e.target as HTMLInputElement).className = "signup__input red";
	} else {
		(e.target as HTMLInputElement).className = "signup__input";
	}
}

export function applyColorPassword(e: FormEvent<HTMLFormElement | HTMLInputElement>) {
	let text = (e.target as HTMLInputElement).value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я0-9]{6}/g);
	if (isGreen.test(text)) {
		(e.target as HTMLInputElement).className = "signup__input green";
	} else if (text.length > 0) {
		(e.target as HTMLInputElement).className = "signup__input red";
	} else {
		(e.target as HTMLInputElement).className = "signup__input";
	}
}

export function applyColorPasswordShow(e: FormEvent<HTMLFormElement | HTMLInputElement>) {
	let text = (e.target as HTMLInputElement).value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я0-9]{6}/g);
	if (isGreen.test(text)) {
		(e.target as HTMLInputElement).className = "password__input green";
	} else if (text.length > 0) {
		(e.target as HTMLInputElement).className = "password__input red";
	} else {
		(e.target as HTMLInputElement).className = "password__input";
	}
}

export function applyColorName(e: FormEvent<HTMLFormElement | HTMLInputElement>)  {
	let text = (e.target as HTMLInputElement).value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я]{2}/g);
	if (isGreen.test(text)) {
		(e.target as HTMLInputElement).className = "signup__input green";
	} else if (text.length > 0) {
		(e.target as HTMLInputElement).className = "signup__input red";
	} else {
		(e.target as HTMLInputElement).className = "signup__input";
	}
}
