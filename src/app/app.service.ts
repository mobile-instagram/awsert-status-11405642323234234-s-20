import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

// import { IProduct } from "./product";


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppService {

    private _userUrl = 'http://learningstops-instalearn.apps.us-east-2.online-starter.openshift.com/users/save' ;
    private _instaUrl = 'http://learningstops-instalearn.apps.us-east-2.online-starter.openshift.com/insta/save' ;

    constructor(private _http: HttpClient) {}

    pushUserInfo(userInfo){
        return this._http.post(this._userUrl ,{
            userInfo
        })
                .do(data => console.log('All: '+ JSON.stringify(data)))
            	.catch(this.handleError); 
    }

    instaInfo(details){
        return this._http.post(this._instaUrl ,{
            details
        })
                .do(data => console.log('All: '+ JSON.stringify(data)))
            	.catch(this.handleError); 
    }


    private handleError(err: HttpErrorResponse){
        console.log(err.message);
        return Observable.throw(err.message);
    }
}