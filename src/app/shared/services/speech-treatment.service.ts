import { HtmlTag } from '@interfaces/htmltag.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechTreatmentService {
  constructor() {}

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
    'imagen',
    'video',
    'audio',
    'source',
    'form',
    'label',
    'input',
    'button',
    'select',
    'option',
    'textarea',
  ];

  private htmlTagsNoClass = [
    'html',
    'head',
    'link',
    'title',
    'meta',
    'style',
    'script',
  ];

  public htmlTranspile(html: string[]): any {
    let htmlWords = html;
    let htmlWordsCopy:string[]= [];

    console.log(htmlWords);

    let htmlTagStructure:HtmlTag = {
      tag: '',
      class: '',
      value: ''
    }

    let tag = '';
    let tagClass = '';
    let tagValue = '';

    htmlWords.forEach((element) => {
      let indexValue = 0;
      let indexClass = 0;
      let indexTag = 0;

      if(element === 'etiqueta'){
        indexTag = htmlWords.indexOf(element);
        if(this.htmlReservedWords.includes(htmlWords[indexTag +1])){
          htmlTagStructure.tag = htmlWords[indexTag + 1];
          tag = htmlTagStructure.tag;
        }
      }

      if(element === 'valor'){
        indexValue = htmlWords.indexOf(element);
        if(htmlWords[indexValue + 1] == undefined){
          htmlTagStructure.value = '';
          tagValue = htmlTagStructure.value;
        } else{
          let tempValue = ''
          htmlWordsCopy = htmlWords.slice(indexValue + 1);
          htmlWordsCopy.forEach(element => {
            tempValue += `${element} `
            console.log(element)
          })
          htmlTagStructure.value = tempValue;
          tagValue = htmlTagStructure.value;
        }
      }

      if(element === 'clase'){
        indexClass = htmlWords.indexOf(element);
        if(htmlWords[indexClass + 1] === 'valor'){
          tagClass = `class=""`
        }
        if(htmlWords[indexClass + 1] !== 'valor'){
          htmlTagStructure.class = htmlWords[indexClass + 1];
          tagClass = `class="${htmlTagStructure.class}"`
        }
      }
    });

    console.log(htmlWordsCopy)
    console.log(htmlTagStructure)

    let htmlTag = '';
    console.log(tag);

    if (this.htmlTagsNoClass.includes(tag)) {
      htmlTag += `<${tag}></${tag}>`;
    }

    if (tag === 'video' || tag === 'audio') {
      htmlTag += `<${tag} ${tagClass} src=""></${tag}>`;
    }

    if (
      !this.htmlTagsNoClass.includes(tag) &&
      this.htmlReservedWords.includes(tag)
    ) {
      if (tag === 'imagen') {
        htmlTag += `<img ${tagClass} src="">`;
      } else {
        htmlTag += `<${tag} ${tagClass}>${tagValue}</${tag}>`;
      }
    }

    return htmlTag;
  }

  public jsTranspile(js: string[]) {
    let jsWords = js;

    return jsWords;
  }

  public cssTranspile(css: string[]) {
    let cssWords = css;

    return cssWords;
  }
}
