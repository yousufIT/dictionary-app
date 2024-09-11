import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IDictionary, IMeaning } from './idictionary'; 

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  //this for send the request with word
  getDictionaryData(word: string,bg : HTMLDivElement): Observable<IDictionary> {
    bg.style.display="none"  
    return this.http.get<any>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).pipe(
      map(apiResponse => mapApiResponseToDictionary(apiResponse[0])), //this for mapping the response like we want in interfaces
      catchError(() => {
        // If error occurs, fetch data from the local JSON file as a fallback
        return this.handillingError(bg);
      })
    );
  }
 
  private handillingError(bg : HTMLDivElement): Observable<IDictionary> {
    bg.style.display="inline" 
    return this.http.get<any>('api/empty.json').pipe(
      map(apiResponse => mapApiResponseToDictionary(apiResponse[0]))
    );
  }
}
//the mapping function actually i didn't write it alone it is so hard 
//but i understand it :)
function mapApiResponseToDictionary(apiResponse: any): IDictionary {

  const phonetics = apiResponse.phonetics || [];
  const phoneticText = phonetics.map((p: { text: any; }) => p.text).join(', ') || '';
  const audioUrls = phonetics.map((p: { audio: any; }) => p.audio).filter((url: any) => url) || [];

  const meanings: IMeaning[] = apiResponse.meanings.map((meaning: { partOfSpeech: any; definitions: any[]; }) => ({
    partOfSpeech: meaning.partOfSpeech,
    definitions: meaning.definitions.map((def: { definition: any; example: any; synonyms: any; }) => ({
      definitionText: def.definition,
      example: def.example || '',
      synonyms: def.synonyms || []
    }))
  }));

  const synonyms = apiResponse.meanings.flatMap((meaning: { synonyms: any; }) => meaning.synonyms || []);
  const antonyms = apiResponse.meanings.flatMap((meaning: { antonyms: any; }) => meaning.antonyms || []);

  const dictionary: IDictionary = {
    word: apiResponse.word || '',
    phonetic: phoneticText,
    audioUrls: audioUrls,
    meanings: meanings,
    synonyms: synonyms,
    antonyms: antonyms
  };

  return dictionary;
}
