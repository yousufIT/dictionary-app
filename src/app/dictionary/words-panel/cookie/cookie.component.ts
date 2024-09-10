import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { cookie1Component } from "./cookie-1/cookie-1.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//هذا الكومبوننت يقوم بجلب اخر 5 كلمات قام المستخدم بالبحث عليها
@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  standalone: true,
  providers: [CookieService],
  imports: [cookieComponent, cookie1Component,CommonModule,FormsModule]
})
export class cookieComponent implements OnInit , OnDestroy{

  @Input() arrayData: string[] = []; // المصفوفة التي نستقبلها من الكمبوننت الأب
  @Output() arrayChanged = new EventEmitter<string[]>(); // نستخدم @Output لإرسال البيانات للكمبوننت الأب

  cookieArray: string[] = [];
  constructor(private cookieService: CookieService) {const cookieValue = this.cookieService.get('WordesArray');
    if (cookieValue) {
      this.cookieArray = JSON.parse(cookieValue);
      this.arrayChanged.emit(this.cookieArray); // إرسال البيانات المحدثة إلى الكمبوننت الأب
      console.log('Array loaded from cookies!');
    } else {
        console.log('No array found in cookies!');
    }
    
    console.log('cook',this.cookieArray)
    // for (let i = 0; i < this.arrayData.length; i++) {
    //     const element = this.arrayData[i];
    // }
    this.arrayData=this.cookieArray
  }
  ngOnInit(): void {
      
}

ngOnDestroy(): void {
}

f(){

    this.arrayData.push("55555");
    this.arrayChanged.emit(this.arrayData);
}

//   loadArrayFromCookies() {
//     const cookieValue = this.cookieService.get('myArray');
//     if (cookieValue) {
//       this.cookieArray = JSON.parse(cookieValue);
//       this.arrayChanged.emit(this.cookieArray); // إرسال البيانات المحدثة إلى المكون الأب
//       alert('Array loaded from cookies!');
//     } else {
//       alert('No array found in cookies!');
//     }
//   }
}
