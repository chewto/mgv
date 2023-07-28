import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

declare var webkitSpeechRecognition:any;


@Injectable({
  providedIn: 'root'
})
export class SpeechDetectionService {

  public recognition = new webkitSpeechRecognition();
  public text$ = new Subject<string>();
  public active$ = new BehaviorSubject<string>('microfono inactivo');
  public color$ = new BehaviorSubject<string>('#ff6358');

  private initialColor = this.color$.getValue();
  private initialActive = this.active$.getValue();

  constructor() { }

  public start(): void{
    this.recognition.interimResults = false;
    this.recognition.lang = 'es-VE';

    this.recognition.addEventListener('result', (event:any) => {
      const transcript = event.results[0][0].transcript;
      this.text$.next(transcript);
    })

    this.recognition.addEventListener('end', (event:any) => {
      console.log('terminado');
      this.active$.next(this.initialActive);
      this.color$.next(this.initialColor);
    })
  }

  public hear():void{
    this.recognition.start();
    console.log('iniciado')
    this.active$.next('microfono activo');
    this.color$.next('#1ce982');
  }
}
