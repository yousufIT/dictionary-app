import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-cookie-1',
    templateUrl: './cookie-1.component.html',
    standalone: true,
  })
  export class cookie1Component {
  
    @Input() word: string="";
    @Output() arrayChanged = new EventEmitter<string[]>();
  }