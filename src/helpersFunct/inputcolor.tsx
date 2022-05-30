import { StringMap } from "i18next";
import { KeyboardEventHandler, SyntheticEvent } from "react";

export function applyColorLogin(e: any) {
	let text = e.target.value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я0-9]{4}/g);
	if (isGreen.test(text)) {
		e.target.className = "signup__input green";
	} else if (text.length > 0) {
		e.target.className = "signup__input red";
	} else {
		e.target.className = "signup__input";
	}
}

export function applyColorPassword(e: any) {
	let text = e.target.value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я0-9]{6}/g);
	if (isGreen.test(text)) {
		e.target.className = "signup__input green";
	} else if (text.length > 0) {
		e.target.className = "signup__input red";
	} else {
		e.target.className = "signup__input";
	}
}

export function applyColorPasswordShow(e: any) {
	let text = e.target.value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я0-9]{6}/g);
	if (isGreen.test(text)) {
		e.target.className = "password__input green";
	} else if (text.length > 0) {
		e.target.className = "password__input red";
	} else {
		e.target.className = "password__input";
	}
}

export function applyColorName(e: any) {
	let text = e.target.value;
	let isGreen = new RegExp(/[A-Za-zА-Яа-я]{2}/g);
	if (isGreen.test(text)) {
		e.target.className = "signup__input green";
	} else if (text.length > 0) {
		e.target.className = "signup__input red";
	} else {
		e.target.className = "signup__input";
	}
}
