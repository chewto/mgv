import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechTreatmentService {

  constructor() { }

  private htmlReservedWords = [
    'script',
    'doctype',
    'html',
    'style',
    'title',
    'link',
    'meta',
    'head',
    'body',
    'nav',
    'main',
    'section',
    'article',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'footer',
    'p',
    'hr',
    'ol',
    'ul',
    'li',
    'div',
    'a',
    'strong',
    'small',
    'span',
    'mark',
    'br',
    'img',
    'video',
    'audio',
    'source',
    'svg',
    'form',
    'label',
    'input',
    'button',
    'select',
    'option',
    'textarea'
  ]


  public htmlTranspile(html:string[]): any{
    let htmlWords = html;

    console.log(htmlWords)

    let tagType = htmlWords[1];

    let htmlTag = '';

    let classValue = '';

    let tagValue = '';

    if(
      tagType === 'html'
      || tagType === 'head'
      || tagType === 'link'
      || tagType === 'title'
      || tagType === 'meta'
      || tagType === 'style'
      || tagType === 'script'
    ){
      htmlTag += `<${tagType}></${tagType}>`;
    } else if(tagType === 'imagen'){
      htmlTag += `<img src="">`;
    } else if(tagType === 'video' || tagType === 'audio'){
      htmlTag += `<${tagType} src=""></${tagType}>`;
    } else {
      for (let index = 0; index < htmlWords.length; index++) {
        const value = htmlWords[index];
        if(value === 'clase'){
          let indexClass = htmlWords.indexOf(value) + 1;
          classValue += htmlWords[indexClass];
        }
        if(value === 'valor'){
          let indexClass = htmlWords.indexOf(value) + 1;
          tagValue += htmlWords[indexClass];
        }
      }

      htmlTag += `<${tagType} class="${classValue}">${tagValue}</${tagType}>`
    }

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
