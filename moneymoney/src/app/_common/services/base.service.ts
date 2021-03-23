import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
//import 'rxjs/add/operator/map';
// import {FileUploader, Headers, FileUploaderOptions} from 'ng2-file-upload';

import {nEmpty} from '@cxFunc';
import {environment} from "@env";
import {Router} from "@angular/router";

@Injectable()
export class BaseService
{
    private ROOT_API;
    constructor(private http: HttpClient,private router: Router)
    {
        this.ROOT_API = environment.webapi;
    }

    public get(url: string): Observable<Response>
    {
        return this.request(url, 'GET');
    }

    public post(url: string, params?: any, files?: any,): Observable<Response> {
        return this.request(url, 'POST', params, null, files);
    }

    // public uploader(path: string): FileUploader
    // {
    //     let token: string = localStorage.getItem('CUR_TOKEN');
    //     let visitorId: string = localStorage.getItem('CUR_VISITOR_ID');
    //     let curMerchantID: string = sessionStorage.getItem('CUR_MERCHANT_ID');
    //
    //     let options: FileUploaderOptions = {};
    //
    //     options.url = this.ROOT_API + path;
    //     options.removeAfterUpload = true;
    //     options.headers = Array<Headers>();
    //     if(token){
    //         options.headers.push({name: 'authorization', value: 'Bearer ' + token});
    //     }
    //     if(visitorId){
    //         options.headers.push({name: 'x_visitor_id', value: visitorId});
    //     }
    //     if(curMerchantID){
    //         options.headers.push({name: 'x_merchant_id', value: curMerchantID});
    //     }
    //
    //     let uploader:FileUploader = new FileUploader(options);
    //
    //     return uploader;
    // }

    //Concept: http://stackoverflow.com/questions/39690426/how-to-use-jax-rs-and-angular2-to-download-a-zip-file/39690427#39690427
    //http://stackoverflow.com/questions/40240796/angular-2-best-approach-to-use-filesaver-js
    public download(path: string, responseType:string, params?: any): Observable<Response>
    {
        return this.request(path, 'POST', params, responseType);
    }

    logout()
    {
        let token = localStorage.getItem(environment.token);
        if(token && token.length > 10) {
            let res: Observable<any> = this.request('/auth/logout', 'GET');
            res.subscribe(result => {
                localStorage.removeItem(environment.token);
                localStorage.removeItem(environment.user);
                window.location.href='/';
            });
        }
        else {
            window.location.href='/';
        }
    }

    clearSession()
    {

    }

    //------------------------------------------------------------------------------------------------------------------
    /**
     * I create this function to cover requestHelper() because of,
     *   - I want to catch all the error from server in subscribe() first.
     *   - I can not use rxjs/add/operator/catch method to catch exception, it not work.
     *   - When I subscribe() in request(), this will be wait until data loaded, then I must create Observable
     *      to return to caller for continue working as asyn.
     */
    private request(path: String, method: string, params?: string, responseType?:string, files?: any): Observable<any>
    {
        return new Observable((observer: Observer<any>) => {

            this.requestHelper(path, method, params, files, responseType)
            /*.pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = this.handleError(error);
                    observer.next(data);
                })
            )*/
                .subscribe(
                    result => {
                        observer.next(result);
                    },
                    (error: HttpErrorResponse) => {
                        let data = this.errorMessage(error);
                        observer.next(data);
                    }
                );

        });
    }

    //TODO angular 6 >>> https://angular.io/guide/http

    private requestHelper(path: String, method: string, params?: string, files?: any, responseType?:string): Observable<any>
    {
        let headerOptions = {
            'authorization': `Bearer ${localStorage.getItem(environment.token)}`
        };
        let headers = new HttpHeaders(headerOptions);
        let url = this.ROOT_API + path;

        if(nEmpty(files)){

            let formData: FormData = new FormData();
            let options:any = { headers: headers};
            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].param_name, files[i].file, files[i].file.name);
            }
            if(nEmpty(params)) {
                formData.append('data', JSON.stringify(params));
            }
            return this.http.post(url, formData, options);
        }
        else{
            let paramX = nEmpty(params) ? params : '';
            let options:any = { headers: headers, body: paramX};
            if(nEmpty(responseType)) {
                options.responseType = responseType;
            }
            return this.http.request(method, url, options);
        }
    }

    private errorMessage(response?: HttpErrorResponse): any
    {
        console.log('Got error');
        let text: string = '';
        if(response){
            let status = response.status;
            text = null;

            if(status === 401){
                //this.clearSession(true);
                return null;
            }

            //Service can return error message in json format
            if(status >= 300 || status < 400){
                text = 'Server return redirect status code: ' + status;
            }
            else if(status >= 400 || status < 500){
                if(status === 400){
                    text = 'Requested service with parameters, can not be processed.';
                }
                else if(status === 401){
                    text = 'User not passed authentication.';
                    this.clearSession();
                }
                else if(status === 403){
                    text = 'No permission to access requested data.';
                }
                else if(status === 404){
                    text = 'Requested service not existing : ' + response.url;
                }
            }
            else if(status >= 500){
                if(status === 500){
                    text = 'ERROR CODE:  ' + status + '. STATUS TEXT: ' + response;
                }
                else if(status === 501){
                    text = 'Requested service is not implemented.';
                }
                else if(status === 502){
                    text = 'Bad Gateway.';
                }
                else if(status === 503){
                    text = 'Service Unavailable.';
                }
                else if(status === 504){
                    text = 'Gateway Timeout.';
                }
                else if(status === 505){
                    text = 'HTTP Version Not Supported.';
                }
            }

            if(text == null) {
                text = 'ERROR CODE: ' + status + '.  STATUS TEXT: ' + response.statusText;
            }
        }

        return {
            success: false,
            message: text
        };
    }


}
