import { HtmlTag } from '@interfaces/htmltag.interface';
import { Injectable } from '@angular/core';
import { Func, JSCommnand, Var } from '@interfaces/jscommand.interface';

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

  private programmingReservedWords = [
    'variable',
    'variables',
    'constantes',
    'constante',
    'funcion',
    'retornar',
    'if',
    'else if',
    'else',
    'bucle',
  ];

  private toCamelCase(nameArr: string[]): string {
    let camelCaseName = '';

    for (let index = 0; index < nameArr.length; index++) {
      if (index <= 0) {
        let firstWord = nameArr[0].toLowerCase();
        camelCaseName += firstWord;
      }

      if (index > 0) {
        let camelWords =
          nameArr[index][0].toUpperCase() +
          nameArr[index].substring(1, nameArr[index].length);
        camelCaseName += camelWords;
      }
    }

    console.log('working');
    return camelCaseName;
  }

  private stringConvert(valuesArr: string[], caracter: string): string {
    let value = valuesArr.join(caracter);
    console.log('working');

    return value;
  }

  private genericProgramming(baseArr: string[], reservedWord: string) {
    let searchWord =
      baseArr.findIndex((element) => element === reservedWord) + 1;
    let valueArr = baseArr.slice(searchWord, baseArr.length);
    let valueToCamelCase =
      valueArr.length > 1 ? this.toCamelCase(valueArr) : valueArr;

    return valueToCamelCase;
  }

  public htmlTranspile(html: string[]): string {
    let htmlWords = html;

    console.log(htmlWords);

    let htmlTagStructure: HtmlTag = {
      tag: '',
      class: '',
      value: '',
    };

    htmlWords.forEach((element) => {
      if (element === 'etiqueta') {
        let tagIndex =
          htmlWords.findIndex((element) => element === 'etiqueta') + 1;

        let valueIndex =
          htmlWords.findIndex((element) => element === 'valor') + 1;
        valueIndex = valueIndex === 0 ? htmlWords.length + 1 : valueIndex;

        let valueArray = htmlWords.slice(valueIndex, htmlWords.length);
        let tagValue =
          valueArray.length > 1
            ? this.stringConvert(valueArray, ' ')
            : htmlWords[valueIndex];

        let classIndex =
          htmlWords.findIndex((element) => element === 'clase') + 1;
        classIndex = classIndex === 0 ? htmlWords.length + 1 : classIndex;

        let classArray = htmlWords.slice(classIndex, valueIndex - 1);
        console.log(classArray);
        let tagClass =
          classArray.length > 1
            ? this.stringConvert(classArray, '-')
            : htmlWords[classIndex];

        htmlTagStructure.tag = this.htmlReservedWords.includes(
          htmlWords[tagIndex]
        )
          ? htmlWords[tagIndex]
          : '';
        htmlTagStructure.value =
          htmlWords[valueIndex] === undefined ? '' : tagValue;
        htmlTagStructure.class =
          htmlWords[classIndex] === undefined
            ? 'class=""'
            : `class="${tagClass}"`;
      }
    });

    let htmlTag = '';

    let tag = htmlTagStructure.tag;
    let tagClass = htmlTagStructure.class;
    let tagValue = htmlTagStructure.value;
    console.log(tagClass);

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

  public jsTranspile(js: string[]): string {
    let jsWords = js;

    let JsCommand: JSCommnand = {
      command: '',
    };

    let func: Func = {
      programLine: '',
      functionName: '',
      funcParams: '',
    };

    let vars: Var = {
      programLine: '',
      varName: '',
      varValue: '',
    };

    let snippet = '';

    jsWords.forEach((element) => {
      let commandIndex = 0;

      if (element === 'programar') {
        commandIndex = jsWords.indexOf(element) + 1;
        JsCommand.command = this.programmingReservedWords.includes(
          jsWords[commandIndex]
        )
          ? jsWords[commandIndex]
          : '';
      }

      if (
        element === 'variable' ||
        element === 'variables' ||
        element === 'constante' ||
        element === 'constantes'
      ) {
        let declaration =
          JsCommand.command === 'variables' || JsCommand.command === 'variable'
            ? 'let'
            : 'const';
        let varName =
          jsWords.findIndex(
            (element) =>
              element === 'variable' ||
              element === 'variables' ||
              element === 'constante' ||
              element === 'constantes'
          ) + 1;
        let varValue =
          jsWords.findIndex(
            (element) => element === 'valor' || element === 'valores'
          ) + 1;
        //error handler
        varValue = varValue === 0 ? jsWords.length + 1 : varValue;

        //transform the var name into camelCase format
        let varNameArray = jsWords.slice(varName, varValue - 1);
        let camelCaseName =
          varNameArray.length > 1
            ? this.toCamelCase(varNameArray)
            : jsWords[varName];

        console.log(varNameArray.length);

        //transform an array of values into string for var values declaration
        let valuesArray = jsWords.slice(varValue, jsWords.length);
        let fullValue =
          valuesArray.length > 1
            ? this.stringConvert(valuesArray, ' ')
            : jsWords[varValue];

        vars.varName =
          jsWords[varName] === 'valor' ||
          jsWords[varName] === 'valores' ||
          jsWords[varName] === undefined
            ? '[nombre variable]'
            : camelCaseName;

        vars.programLine += `${declaration} ${vars.varName} = `;

        vars.varValue =
          jsWords[varValue] === undefined ||
          jsWords[varValue] === jsWords[varName]
            ? 'valor provisional'
            : fullValue;

        vars.programLine += `'${vars.varValue}';`;
        snippet = vars.programLine;
        console.log(vars);
      }

      if (element === 'funcion') {
        let funcName =
          jsWords.findIndex((element) => element === 'funcion') + 1;
        let funcParams =
          jsWords.findIndex(
            (element) => element === 'parametros' || element === 'parametro'
          ) + 1;
        //error handling
        funcParams = funcParams === 0 ? jsWords.length + 1 : funcParams;

        //func name array convertion into camelCase format
        let funcNameArray = jsWords.slice(funcName, funcParams - 1);
        let funcNameCamelCase =
          funcNameArray.length > 1
            ? this.toCamelCase(funcNameArray)
            : jsWords[funcName];

        let funcParamArray = jsWords.slice(funcParams, jsWords.length);
        let funcParamTotal = this.stringConvert(funcParamArray, ', ');
        console.log(funcNameCamelCase, funcParamTotal);

        console.log(jsWords[funcName], jsWords[funcParams]);

        func.functionName =
          jsWords[funcName] === undefined ||
          jsWords[funcName] === 'parametros' ||
          jsWords[funcName] === 'parametro'
            ? 'nombreProvisional'
            : funcNameCamelCase;
        func.funcParams =
          jsWords[funcParams] === undefined
            ? 'parametroProvisional'
            : funcParamTotal;

        func.programLine = `function ${func.functionName}(${func.funcParams}){

}`;

        snippet = func.programLine;
      }

      if (element === 'retorno') {
        let returnValue = this.genericProgramming(jsWords, 'retorno');

        snippet = `return ${returnValue}`;
      }

      if (element === 'si') {
        snippet = `if ('condicion provisional') {

};`;
      }

      if (element === 'sino') {
        snippet = `else if('condicion provisional'){

}`;
      }

      if (element === 'entonces') {
        snippet = `else{

}`;
      }

      if (element === 'bucle') {
        let arrayValue = this.genericProgramming(jsWords, 'array');
        snippet = `for (let index = 0; index < ${arrayValue}.length; index++) {
  const elemento = array[index];
};`;
      }
    });

    return snippet;
  }
}
