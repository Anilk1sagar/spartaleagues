import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

	private headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');;

	constructor(private http: HttpClient) {

    }

    //Get
	doGetObservable(url): Observable<any> {
        console.log("API URL: ", url);
        return this.http.get(url, { headers: this.headers });
    }

    //Get With Autherisation
	doGetAuthObservable(url, pAuthToken): Observable<any> {
        console.log("API URL: ", url);

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.append('Authorization', pAuthToken);

        return this.http.get(url, { headers: headers });
    }
    
    //For Get Serch query
    doGetObservableForQuery(url, params): Observable<any> {
        
        console.log("API URL: ", url);
        return this.http.get(url, { headers: this.headers, params: params });
    }
    
    //Post
    doPostObservable(url, data): Observable<any> {
        
        console.log("API URL: ", url);
        console.log("Data", data);

        return this.http.post(url, data, { headers: this.headers });
    }

    //Post
    doPutObservable(url, data): Observable<any> {
        
        console.log("API URL: ", url);
        console.log("Data", data);

        return this.http.put(url, data, { headers: this.headers });
    }

}
