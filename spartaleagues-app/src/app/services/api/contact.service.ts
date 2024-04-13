import { Injectable } from '@angular/core';
import { RequestUtils } from "../../utils";
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { ModelStatus } from '../../models'

@Injectable()
export class ContactService {


	constructor(private apiService: ApiService, private requestUtils: RequestUtils) { }

	sendEmail(pData): Observable<ModelStatus> {

		let sendEmailUrl = RequestUtils.BASE_URL + this.requestUtils.sendEmail().contact;

        let params = new URLSearchParams();

		for (let key in pData) {
            if (pData[key]) {
                console.log("key: ", pData[key]);
                params.append(key, pData[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(sendEmailUrl, params.toString());
	}

}
