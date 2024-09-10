
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { cookieComponent } from "./cookie/cookie.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-words-panel',
  templateUrl: './words-panel.component.html',
  standalone: true,
  imports: [cookieComponent],
})
export class wordsPanelComponent {
  arrayData: string[] = ["kk"];
  arrayChanged1 = new EventEmitter<string[]>();

  constructor(private cookieService: CookieService) {
  }

  
  arrayChanged($newArray: string[]){
  }
  save(): void {
    this.cookieService.set('WordesArray', JSON.stringify(this.arrayData));
    console.log('Array saved to cookies!',this.arrayData);
}

}

