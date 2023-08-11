import { ColorsLocalService } from './shared/services/colors-local.service';
import { Component, OnInit } from '@angular/core';
import { Colors } from '@interfaces/colors.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .background{
      width: 100%;
      height: 100%
    }
  `]
})
export class AppComponent implements OnInit{
  title = 'mgv';

  private localStorage = window.localStorage;

  public userColors!:Colors;

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
