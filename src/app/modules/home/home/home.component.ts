import { Component, OnInit } from '@angular/core';
import { Colors } from '@interfaces/colors.interface';
import { ColorsLocalService } from 'src/app/shared/services/colors-local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

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
