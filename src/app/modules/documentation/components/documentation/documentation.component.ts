import { Component, OnInit } from '@angular/core';
import { Colors } from '@interfaces/colors.interface';
import { ColorsLocalService } from 'src/app/shared/services/colors-local.service';

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

  constructor(
    public colors:ColorsLocalService
  ){}

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
  }
}
