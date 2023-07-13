import { Subject, first } from 'rxjs';
import { SpeechDetectionService } from './../../../../shared/services/speech-detection.service';
import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpeechTreatmentService } from 'src/app/shared/services/speech-treatment.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  public editorInput = new FormControl('');

  @ViewChild('editor') editor!: ElementRef;
  @ViewChild('output') output!: ElementRef;

  constructor(
    private speechDetectionSVC: SpeechDetectionService,
    private speechTreatmentSVC: SpeechTreatmentService,
    private renderer: Renderer2
  ) {
    this.speechDetectionSVC.start();
  }

  public onKeyup(): void {
    this.output.nativeElement.srcdoc = this.editorInput.value;
  }

  public copy(): void {
    this.editor.nativeElement.select();
    navigator.clipboard.writeText(this.editor.nativeElement.value);
    console.log('clipboard = ' + this.editor.nativeElement.value);
  }

  public onVoice() {
    this.speechDetectionSVC.hear();
    this.speechDetectionSVC.text$.pipe(first()).subscribe((res) => {
      console.log(res);
      const text = this.voiceTreatment(res);
      const currentText = this.editor.nativeElement.value;
      this.editor.nativeElement.value = `${currentText} \n${text}`;
    });

    console.log(this.editor.nativeElement.innerText);
  }

  public onKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();

      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      console.log(start, end);

      // Insert tab character at current cursor position
      textarea.value =
        textarea.value.substring(0, start) +
        '  ' +
        textarea.value.substring(end);
      // Move cursor to the newly added tab character
      //textarea.setSelectionRange(start + 1, start + 1);
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

    // for (let index = 0; index < transpileWords.length; index++) {
    //   const element = transpileWords[index];
    //   console.log(element)
    // }

    return finalCommand;
  }
}
