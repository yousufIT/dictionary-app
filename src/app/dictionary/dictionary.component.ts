import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IDictionary } from './idictionary';
import { DictionaryService } from './dictionary.sevice';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { stopComponent } from "./stop/stop.component";
import { playComponent } from "./play/play.component";
import { wordsPanelComponent } from './words-panel/words-panel.component';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [CommonModule, TabsModule, FormsModule, stopComponent, playComponent, wordsPanelComponent],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  
  dictionary$: Observable<IDictionary> | undefined;
  dictionary: IDictionary | undefined;
  
  word: string = "";
  wordsPanel!:HTMLDivElement;
  bg!:HTMLDivElement;
  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {}

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  disableEnable() {
    if (this.staticTabs?.tabs[2]) {
      this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    }
  }
//this for get the data from service to component 
  GetData(word: string): void {
    this.dictionary$ = this.dictionaryService.getDictionaryData(word);
    this.dictionary$.subscribe({
      next: (data) => {
        this.dictionary = data;
      },
      error: (err) => {
        console.error('Error fetching dictionary data:', err);
      }
    });
    this.hideWordsPanel();
  }
  toggleAudio(audioPlayer: HTMLAudioElement,play : HTMLDivElement, stop: HTMLDivElement) {
    if (audioPlayer.paused) {
      audioPlayer.play();
      this.changAudioIcone(stop,play)
    } else {
      audioPlayer.pause();
      this.changAudioIcone(play,stop)
      
    }
  }
  
  changAudioIcone(play : HTMLDivElement, stop: HTMLDivElement) {
    stop.style.display="none"  
    play.style.display="inline"  

  }


  // اخفاء و اظهار بانل الكلمات 
  onFocus(wordsPanel: HTMLDivElement ,bg : HTMLDivElement) {
    this.wordsPanel=wordsPanel;
    this.wordsPanel.style.display="inline"
    this.bg=bg;
    bg.style.display="inline";
    console.log('Text box is focused!');
  }
  hideWordsPanel() {
    this.wordsPanel.style.display="none"  
    this.bg.style.display="none";
    console.log('Text box lost focus!');
  }


  addWordToArry(word:string){

  }


}
