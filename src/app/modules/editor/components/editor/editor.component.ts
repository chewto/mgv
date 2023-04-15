import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @ViewChild('editor') editor!:ElementRef;
  @ViewChild('output') output!:ElementRef;

  public onKeyup(): void{
    this.output.nativeElement.srcdoc = this.editor.nativeElement.value;
  }

  public copy(): void{
    this.editor.nativeElement.select();
    navigator.clipboard.writeText(this.editor.nativeElement.value);
    console.log("clipboard = " + this.editor.nativeElement.value)
  }
}

