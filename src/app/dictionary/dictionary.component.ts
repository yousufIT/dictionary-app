// import { Component, OnInit } from '@angular/core';
// import { catchError, Observable, throwError, timeout } from 'rxjs';
// import { IDictionary } from './idictionary';
// import { DictionaryService } from './dictionary.sevice';

// @Component({
//   selector: 'app-dictionary',
//   standalone: true,
//   imports: [],
//   templateUrl: './dictionary.component.html',
//   styleUrls: ['./dictionary.component.css']
// })
// export class DictionaryComponent implements OnInit {
  
//   dictionary$: Observable<IDictionary> | undefined;
//   dictionary: IDictionary | undefined;

//   constructor(private dictionaryService: DictionaryService) {}

//   ngOnInit(): void {
//     this.dictionary$ = this.dictionaryService.dictionary$;
//     // الاشتراك في observable للحصول على البيانات
//     this.dictionary$.subscribe({
//       next: (data) => {
//         this.dictionary = data;
//         console.log('Dictionary data:', this.dictionary);
//         console.log(this.dictionary.word)
//       },
//       error: (err) => console.error('Error fetching dictionary data:', err)
//     });
//   }
// }
import { Component, OnInit,ViewChild } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { IDictionary } from './idictionary';
import { DictionaryService } from './dictionary.sevice';


import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  
  dictionary$: Observable<IDictionary> | undefined;
  dictionary: IDictionary  | undefined;

  word :string ="";

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
      // error: (err) => console.error('Error fetching dictionary data:', err)
    });
  }
  
  
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  
  disableEnable() {
    if (this.staticTabs?.tabs[2]) {
      this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    }
  }

  getData(){
  
if (this.dictionary) { 
  // for (let item of this.dictionary.meanings) {
    console.log(this.dictionary.word);
  // }
}
  }
}

