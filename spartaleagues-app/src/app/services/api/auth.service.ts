import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { RequestUtils } from "../../utils";
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { LocalStorageService } from '../localstorage.service';

import { ModelStatus, ModelUserLogin, ModelUser } from '../../models';

@Injectable()
export class AuthService {
	
	authToken: string;
	user: ModelUser;

	constructor(private apiService: ApiService, private requestUtils: RequestUtils, private router: Router, private localSS: LocalStorageService) {
		//this.logout();
	}

	// Register User
	registerUser(pUser): Observable<ModelStatus> {

		let registerUrl = RequestUtils.BASE_URL + this.requestUtils.auth().register;

		let params = new URLSearchParams();

		for (let key in pUser) {
            if (pUser[key]) {
                console.log("key: ", pUser[key]);
                params.append(key, pUser[key]);
            }
		}
		console.log(params.toString());

		return this.apiService.doPostObservable(registerUrl, params.toString());
	}


	// User Login
	authenticateUser(pUser):Observable<ModelUserLogin> {

		let authenticateUrl = RequestUtils.BASE_URL + this.requestUtils.auth().authenticate;

		let params = new URLSearchParams();
        for (let key in pUser) {
            if (pUser[key]) {
                console.log("key: ", pUser[key]);
                params.append(key, pUser[key]);
            }

        }
        console.log(params.toString());

		return this.apiService.doPostObservable(authenticateUrl, params.toString());
	}



	//===========================Custom Functions========================//
	// Store User Data
	storeUserData(token, user) {
		this.localSS.storeUserData(token, user);
		this.authToken = token;
		this.user = user;
	}


	// Check is user logged in
	loggedIn() {
		return tokenNotExpired('id_token');
	}


	// Check is Admin logged in
	adminAuthentication() {
		this.user = this.localSS.getUser();
		if(this.user.email == "anilk1sagar@gmail.com") {
			return true;
		} else {
			return false;
		}
	}


	// Logout
	logout() {
		this.authToken = null;
		this.user = null;
		this.localSS.clearAll();
		this.router.navigate(['/login']);
	}

}
