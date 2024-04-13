import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

	err: any;

	constructor() { }

	// Validation for Register form
	validateRegister(user) {
		if(user.name != undefined && user.username != undefined && user.email != undefined && user.password != undefined) {

			// Check Password Length
			if(user.password.length >= 8) {
				return true;
			} else {
				this.err = "Password should be atleast 8 characters long!";
				return false;
			}

		} else {
			this.err = "Please fill in all fields!";
			return false;
		}
	}

	// Validation for login form
	validateLogin(user) {
		if(user.email == undefined || user.password == undefined) {
			return false;
		} else {
			return true;
		}
	}

	// Validation for Reset Password
	validateResetPassword(pEmail) {
		if(pEmail == undefined) {
			return false;
		} else {
			return true;
		}
	}

	// Validate Emails
	validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	// Validate Steam Profile
	validateSteamProfile(steamProfile) {
		var check = steamProfile,
		regexp = new RegExp('(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+'),
		test = regexp.test(check);
		return test;
	}

	// Validation for Contact form
	validateContact(data) {
		if(data.name != undefined && data.email != undefined && data.message != undefined) {
			return true;
		} else {
			this.err = "Please fill in all fields!";
			return false;
		}
	}

	// Validation for Post form
	validatePost(data) {
		if(data.gameName != undefined && data.heading != undefined  && data.description != undefined) {
			return true;
		} else {
			this.err = "Please fill in all fields!";
			return false;
		}
	}

	// Validation for Competetion form
	validateCompetetion(data) {
		if(data.competetionName != undefined && data.competetionGameName != undefined &&   data.competetionLocation != undefined && data.competetionEntryFees.multiPlayerMode != undefined && data.competetionDate != undefined) {
			return true;
		} else {
			this.err = "Please fill in all fields!";
			return false;
		}
	}

	// Validation for Faq form
	validateFaq(data) {
		if(data.faqQuestion != undefined && data.faqAns != undefined) {
			return true;
		} else {
			this.err = "Please fill in all fields!";
			return false;
		}
	}

	// Validation for Team Name
	validateTeamName(teamName) {
		if(teamName != undefined) {
			return true;
		} else {
			return false;
		}
	}

	// Validation For participate Form
	validateParticipate(user) {
		if(user.teamName != undefined && user.contact != undefined) {
			return true;
		} else {
			return false;
		}
	}
}
