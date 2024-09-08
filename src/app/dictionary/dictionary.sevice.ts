import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IDictionary } from "./idictionary";
import { catchError, throwError } from "rxjs";




@Injectable({
    providedIn:'root'
})
export class DictionaryService{
    constructor(private http: HttpClient) { }

    dictionary$ = this.http.get<IDictionary>("https://api.dictionaryapi.dev/api/v2/entries/en/fuck")
                       .pipe(
                       catchError(this.handleError)
                       );
  
    private handleError(err: HttpErrorResponse){
      let errorMessage = '';
  
      if(err.error instanceof ErrorEvent){
        // client or network error
        errorMessage = `Error: ${err.error.message}`;
      }
      else {
        // server error
        errorMessage = `Error: ${err.message}`;
      }
  
      console.error(errorMessage);
  
      return throwError(() => errorMessage);
    }
}