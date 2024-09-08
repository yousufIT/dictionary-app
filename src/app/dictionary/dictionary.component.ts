import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { IDictionary } from './idictionary';
import { DictionaryService } from './dictionary.sevice';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  
  dictionary$: Observable<IDictionary> | undefined;
  dictionary: IDictionary | undefined;

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.dictionary$ = this.dictionaryService.dictionary$;
    // الاشتراك في observable للحصول على البيانات
    this.dictionary$.subscribe({
      next: (data) => {
        this.dictionary = data;
        console.log('Dictionary data:', this.dictionary);
        console.log(this.dictionary.word)
      },
      error: (err) => console.error('Error fetching dictionary data:', err)
    });
  }
}
