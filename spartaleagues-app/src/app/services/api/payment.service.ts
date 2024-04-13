import { Injectable } from '@angular/core';
import { RequestUtils } from "../../utils";
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { ModelStatus } from '../../models';

function _window() : any {
    // return the global native browser window object
    return window;
 }

@Injectable()
export class PaymentService {


	constructor(private apiService: ApiService, private requestUtils: RequestUtils) {}

    get nativeWindow() : any {
        return _window();
    }

    // Check team name availability
    checkTeamName(pTeamName): Observable<ModelStatus> {

        pTeamName.toLowerCase();

        let checkTeamNameUrl = RequestUtils.BASE_URL + this.requestUtils.team().checkTeamName;

        let params = new URLSearchParams();

        params.set("teamName", pTeamName);

		console.log(params.toString());

        return this.apiService.doPostObservable(checkTeamNameUrl, params.toString());
    }


    //Creating Hash
    createHash(data) {

        let createHashUrl = RequestUtils.BASE_URL + this.requestUtils.payment().createHash;

        let params = new URLSearchParams();

		for (let key in data) {
            if (data[key]) {
                console.log("key: ", data[key]);
                params.append(key, data[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(createHashUrl, params.toString());
    }


    //Add participant user in database after payment successfull
    addParticipantUser(pData): Observable<ModelStatus> {

        let addParticipantUserUrl = RequestUtils.BASE_URL + this.requestUtils.payment().addParticipantUser;

        let params = new URLSearchParams();

		for (let key in pData) {
            if (pData[key]) {
                console.log("key: ", pData[key]);
                params.append(key, pData[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(addParticipantUserUrl, params.toString());
    }

    // Send Payment Invoice
	sendPaymentInvoice(pData): Observable<ModelStatus> {
  
        let sendPaymentInvoiceUrl = RequestUtils.BASE_URL + this.requestUtils.sendEmail().paymentInvoice;

        let params = new URLSearchParams();

		for (let key in pData) {
            if (pData[key]) {
                console.log("key: ", pData[key]);
                params.append(key, pData[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(sendPaymentInvoiceUrl, params.toString());
    }
    

}
