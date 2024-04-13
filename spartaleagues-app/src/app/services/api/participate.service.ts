import { Injectable } from '@angular/core';
import { RequestUtils } from "../../utils";
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { ModelStatus } from '../../models';
import { LocalStorageService } from '../localstorage.service';

@Injectable()
export class ParticipateService {


	authToken: string;

	constructor(private apiService: ApiService, private requestUtils: RequestUtils, private localSS: LocalStorageService) {}

	// Search Users
	searchUser(pUser) {

		let searchUsersUrl = RequestUtils.BASE_URL + this.requestUtils.search().searchUsers;

        let params = new URLSearchParams();

		for (let key in pUser) {
            if (pUser[key]) {
                console.log("key: ", pUser[key]);
                params.append(key, pUser[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(searchUsersUrl, params.toString());
	}

	
	// Send Team Invite
	sendTeamInvite(pUser): Observable<ModelStatus> {

		let sendTeamInviteUrl = RequestUtils.BASE_URL + this.requestUtils.sendEmail().teamInvite;

        let params = new URLSearchParams();

		for (let key in pUser) {
            if (pUser[key]) {
                console.log("key: ", pUser[key]);
                params.append(key, pUser[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(sendTeamInviteUrl, params.toString());
	}


	//Get participated user status data
	getParticipantUserStatus(pEmail) {
		
		this.loadToken();

		let getParticipantUserUrl = RequestUtils.BASE_URL + this.requestUtils.participants().getParticipantUser+pEmail;

		return this.apiService.doGetAuthObservable(getParticipantUserUrl, this.authToken);
	}

	getTeams() {

		let getAllTeamsUrl = RequestUtils.BASE_URL + this.requestUtils.team().getAllTeams;

        return this.apiService.doGetObservable(getAllTeamsUrl);
	}


	//Load Token
	loadToken() {
		this.authToken = this.localSS.getToken();
	}

}
