import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

declare var webkitSpeechRecognition:any;

@Injectable({
  providedIn: 'root'
})
export class SpeechDetectionService {

  public recognition = new webkitSpeechRecognition();
  public text$ = new Subject<string>();

  constructor() { }

  public start(): void{
    this.recognition.interimResults = false;
    this.recognition.lang = 'es-VE';

    this.recognition.addEventListener('result', (event:any) => {
      const transcript = event.results[0][0].transcript;
      this.text$.next(transcript);
    })
  }

  public hear():void{
    this.recognition.start();
    console.log('init')
  }
}
