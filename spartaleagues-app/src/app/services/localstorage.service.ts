import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LocalStorageService {

	// Store User Data After Login
	storeUserData (token, user) {
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
	}

	// Get Token
	getToken() {
		return localStorage.getItem('id_token');
	}

	// Get User Data
	getUser() {
		return JSON.parse(localStorage.getItem("user"));
	}

	
	// Store And Get Participate User
	storeParticipantUser(user) {
		localStorage.setItem('ParticipateUser', JSON.stringify(user));
	}

	getParticipantUser() {
		return JSON.parse(localStorage.getItem("ParticipateUser"));
	}


	// Set And Get Competetion Detailes
	storeCompetetion(data) {
		localStorage.setItem('competetion', JSON.stringify(data));
	}

	getCompetetion() {
		return JSON.parse(localStorage.getItem("competetion"));
	} 


	// Set and Get Payment Status
	storePaymentStatus(paymentStatus) {
		localStorage.setItem('paymentStatus', JSON.stringify(paymentStatus));
	}

	getPaymentStatus() {
		return JSON.parse(localStorage.getItem("paymentStatus"));
	}


	//Clear All
	clearAll() {
		localStorage.clear();
	}


}
