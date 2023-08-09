import { Component, OnInit } from '@angular/core';
import { Colors } from '@interfaces/colors.interface';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit{

  private localStorage = window.localStorage;

  public userColors!:Colors;

  public htmlReservedWords = [
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
    'parrafo',
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

  public htmlTagsNoClass = [
    'html',
    'head',
    'link',
    'title',
    'meta',
    'style',
    'script',
  ];

  public programmingReservedWords = [
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

  ngOnInit(): void {
    const userSettings = this.retrieveLocal('userColors');
    this.userColors = JSON.parse(userSettings);
    console.log(this.userColors)
  }

  private retrieveLocal(key:string): string{
    const retrieveLocalData = this.localStorage.getItem(key);
    return retrieveLocalData ? retrieveLocalData : 'no info';
  }
}
