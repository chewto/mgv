import { takeUntil, first, BehaviorSubject, Subject } from 'rxjs';
import { SpeechDetectionService } from '../../../../shared/services/speech-detection.service';
import { Component, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpeechTreatmentService } from 'src/app/shared/services/speech-treatment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SaveModalComponent } from '../save-modal/save-modal.component';
import { Colors } from '@interfaces/colors.interface';
import { ColorsLocalService } from 'src/app/shared/services/colors-local.service';


interface Save{
  initialValue: unknown;
  finalValue: unknown;
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy{

  private localStorage = window.localStorage;

  public editorInput = new FormControl('');

  private savePremonition:Save = {
    initialValue: 0,
    finalValue: 0
  }

  public color$ = this.speechDetectionSVC.color$;
  public active$ = this.speechDetectionSVC.active$;

  public copy$ = new BehaviorSubject<string>('copiar');
  public save$ = new BehaviorSubject<string>('guardar');
  
  private copyInitialValue = this.copy$.getValue();
  private saveInitialValue = this.save$.getValue();

  private destroy$ = new Subject<void>();

  public userColors!:Colors;

  @ViewChild('editor') editor!: ElementRef;
  @ViewChild('output') output!: ElementRef;

  constructor(
    private speechDetectionSVC: SpeechDetectionService,
    private speechTreatmentSVC: SpeechTreatmentService,
    private router: Router,
    public saveDialog: MatDialog,
    public colors:ColorsLocalService
  ) {
    this.speechDetectionSVC.start();
  }

  ngOnInit(): void {

    const userSettings = this.colors.retriveLocal('userColors');
    console.log(userSettings)

    if(typeof userSettings === 'string'){
      this.userColors = JSON.parse(userSettings)
      console.log(this.userColors)
    }

    if(userSettings === null){
      this.userColors = {
        firstColor: '#0B2447',
        secondColor: '#19376D',
        thirdColor: '#A5D7E8',
        textColor: '#19376D',
        textCodeColor: '#ffffff'}
      console.log(this.userColors)
    }


    const code = this.retrieveLocal('code');
    this.editorInput.setValue(code);

    const codeInitialLength = code?.length

    this.savePremonition.initialValue = codeInitialLength;
    console.log(this.savePremonition)

    this.editorInput.valueChanges
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((inputChange) => {
      this.save$.next(this.saveInitialValue);
      this.copy$.next(this.copyInitialValue);
    })
  }

  public save(): void{
    this.localStorage.setItem('code', this.editor.nativeElement.value);
    this.save$.next('guardado');
  }

  public onKeyup(): void {
    this.output.nativeElement.srcdoc = this.editorInput.value;
  }

  public copy(): void {
    this.editor.nativeElement.select();
    navigator.clipboard.writeText(this.editor.nativeElement.value);
    console.log('clipboard = ' + this.editor.nativeElement.value);

    this.copy$.next('copiado')
  }

  public onVoice(): void{
    this.speechDetectionSVC.hear();
    this.speechDetectionSVC.text$
    .pipe(
      first(),
      takeUntil(this.destroy$)
    )
    .subscribe((res) => {
      console.log(res);
      const text = this.voiceTreatment(res);
      const currentText = this.editor.nativeElement.value;
      this.editor.nativeElement.value = `${currentText} \n${text}`;
    });

    console.log(this.editor.nativeElement.innerText);
  }

  public redirectTo(): void{

    const codeFinalLength= this.editor.nativeElement.value.length;

    this.savePremonition.finalValue = codeFinalLength;
    console.log(this.savePremonition)

    const modalConfig = {
      width: '200px',
      height:'160px'
    }

    if(typeof this.savePremonition.finalValue === 'number' && typeof this.savePremonition.initialValue === 'number'){
      if(this.savePremonition.finalValue > this.savePremonition.initialValue){
        const dialogRef = this.saveDialog.open(SaveModalComponent, {
          width: '240px',
          height:'160px',
          data: {
            colors: this.userColors
          },
          disableClose: true
        });

        dialogRef.afterClosed()
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((modalResponse:boolean) => {
          if(modalResponse){
            this.save();
            this.router.navigate(['/']);
          }

          if(!modalResponse){
            this.router.navigate(['/']);
          }
        })
      }

      if(this.savePremonition.finalValue === this.savePremonition.initialValue){
        this.router.navigate(['/']);
      }
    }
  }

  public onKeydown(event: KeyboardEvent): void{
    if (event.key === 'Tab') {
      event.preventDefault();


      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd ;

      // console.log(start, end);

      // Insert tab character at current cursor position
      textarea.value =
        textarea.value.substring(0, start) +
        '   ' +
        textarea.value.substring(end);
      // Move cursor to the newly added tab character
      textarea.setSelectionRange(start + 1, start + 1);
    }
  }

  private voiceTreatment(words: string): any {
    let transpileWords = words
      .toLocaleLowerCase()
      .replace(/á/, 'a')
      .replace(/é/, 'e')
      .replace(/í/, 'i')
      .replace(/ó/, 'o')
      .replace(/ú/, 'u')
      .split(' ');
    let finalCommand = '';

    if (transpileWords[0] === 'etiqueta') {
      console.log('vas a usar html');
      finalCommand = this.speechTreatmentSVC.htmlTranspile(transpileWords);
    } else if (transpileWords[0] === 'programar') {
      console.log('vas a usar javascript');
      finalCommand = this.speechTreatmentSVC.jsTranspile(transpileWords);
    } else {
      finalCommand = words;
    }

    console.log(transpileWords);

    return finalCommand;
  }

  private retrieveLocal(key:string): string{
    const retrieveLocalData = this.localStorage.getItem(key);
    return retrieveLocalData ? retrieveLocalData : 'no info';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
