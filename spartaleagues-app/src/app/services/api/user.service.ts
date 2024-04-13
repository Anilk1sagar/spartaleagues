import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestUtils } from "../../utils";
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { LocalStorageService } from '../localstorage.service';

import { ModelUser, ModelStatus } from '../../models';

@Injectable()
export class UserService {
	
    authToken: string;

	constructor(private apiService: ApiService, private requestUtils: RequestUtils, private router: Router, private localSS: LocalStorageService) {
    }
    

	// Get User Data
	getProfile():Observable<ModelUser> {
		this.loadToken();

        let getProfileUrl = RequestUtils.BASE_URL + this.requestUtils.user().getProfile;

		return this.apiService.doGetAuthObservable(getProfileUrl, this.authToken);
	}


	// Update User
	updateUser(pUser): Observable<ModelStatus> {

        const profile = this.localSS.getUser();
        const id = profile.id;
        
        let updateUserUrl = RequestUtils.BASE_URL + this.requestUtils.user().update+id;

        let params = new URLSearchParams();

		for (let key in pUser) {
            if (pUser[key]) {
                console.log("key: ", pUser[key]);
                params.append(key, pUser[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPutObservable(updateUserUrl, params.toString());
	}


	// Reset User Password Send Email
	resetPassword(pEmail): Observable<ModelStatus> {
        
        let resetPasswordUrl = RequestUtils.BASE_URL + this.requestUtils.sendEmail().resetPassword;

        let params = new URLSearchParams();

        params.set("email", pEmail);
        
		console.log(params.toString());

        return this.apiService.doPostObservable(resetPasswordUrl, params.toString());
	}

	
	// Update User Password
	updatePassword(pUser): Observable<ModelStatus> {

        let updatePasswordUrl = RequestUtils.BASE_URL + this.requestUtils.user().updatePassword;

        let params = new URLSearchParams();

		for (let key in pUser) {
            if (pUser[key]) {
                console.log("key: ", pUser[key]);
                params.append(key, pUser[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPutObservable(updatePasswordUrl, params.toString());
	}


    // LOad Token
	loadToken() {
		this.authToken = this.localSS.getToken();
	}

}
