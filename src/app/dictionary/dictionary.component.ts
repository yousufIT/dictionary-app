import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDictionary } from './idictionary';
import { DictionaryService } from './dictionary.sevice';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent implements OnInit {
  
  dictionary$:Observable<IDictionary>|undefined;

  constructor(private dictionaryService:DictionaryService){}
  ngOnInit(): void {
    this.dictionary$=this.dictionaryService.dictionary$;
    console.log(this.dictionary$)
  }
  


}
