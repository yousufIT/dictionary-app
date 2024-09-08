import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DictionaryComponent } from "./dictionary/dictionary.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DictionaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dictionary-app';
}
