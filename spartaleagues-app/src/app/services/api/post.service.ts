import { Injectable } from '@angular/core';
import { RequestUtils } from "../../utils";
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { ModelStatus } from '../../models';

@Injectable()
export class PostService {


	heading: String;

	constructor(private apiService: ApiService, private requestUtils: RequestUtils) { }

	// Upload Post
	addPost(post): Observable<ModelStatus> {

		let addPostUrl = RequestUtils.BASE_URL + this.requestUtils.post().addPosts;

        let params = new URLSearchParams();

		for (let key in post) {
            if (post[key]) {
                console.log("key: ", post[key]);
                params.append(key, post[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(addPostUrl, params.toString());
	}

	// Get All Posts
	getCsgoPosts(offset) {
		let getCsgoPostsUrl = RequestUtils.BASE_URL + this.requestUtils.post().getCsgoPosts+offset;

        return this.apiService.doGetObservable(getCsgoPostsUrl);
	}

	getBadmintonPosts(offset) {
		let getBadmintonPostsUrl = RequestUtils.BASE_URL + this.requestUtils.post().getBadmintonPosts+offset;

        return this.apiService.doGetObservable(getBadmintonPostsUrl);
	}

	// Get Single Post	
	getSinglePost(heading) {

		let getSinglePostUrl = RequestUtils.BASE_URL + this.requestUtils.post().getSinglePost+heading;

        return this.apiService.doGetObservable(getSinglePostUrl);
	}

	
	// Upload Competetions
	addCompetetion(pEvent) {

		let addEventUrl = RequestUtils.BASE_URL + this.requestUtils.post().addPosts;

        let params = new URLSearchParams();

		for (let key in pEvent) {
            if (pEvent[key]) {
                console.log("key: ", pEvent[key]);
                params.append(key, pEvent[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(addEventUrl, params.toString());
	}

	// Get Competetion
	getCompetetion() {
		let getEventsUrl = RequestUtils.BASE_URL + this.requestUtils.post().getEvents;

        return this.apiService.doGetObservable(getEventsUrl);
	}


	// Upload Faq
	addFaq(pFaq) {

		let addFaqUrl = RequestUtils.BASE_URL + this.requestUtils.post().addFaqs;

        let params = new URLSearchParams();

		for (let key in pFaq) {
            if (pFaq[key]) {
                console.log("key: ", pFaq[key]);
                params.append(key, pFaq[key]);
            }
		}
		console.log(params.toString());

        return this.apiService.doPostObservable(addFaqUrl, params.toString());
	}

	// Get All Faqs
	getFaqs() {

		let getFaqsUrl = RequestUtils.BASE_URL + this.requestUtils.post().getFaqs;

        return this.apiService.doGetObservable(getFaqsUrl);
	}

}
