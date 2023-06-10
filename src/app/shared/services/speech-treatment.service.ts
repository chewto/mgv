import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechTreatmentService {

  constructor() { }


  public htmlTranspile(html:string[]): any{
    let htmlWords = html;

    console.log(htmlWords)

    let tagType = htmlWords[2]

    let htmlTag = `<${tagType}></${tagType}>`;

    return htmlTag;
  }

  public jsTranspile(js:string[]){
    let jsWords = js;

    return jsWords;
  }

  public cssTranspile(css:string[]){
    let cssWords = css;

    return cssWords;
  }
}
