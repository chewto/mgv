import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Colors } from '@interfaces/colors.interface';
import { Subject } from 'rxjs';
import { ColorsLocalService } from 'src/app/shared/services/colors-local.service';


@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss']
})
export class PersonalizationComponent implements OnInit{

  private localStorage = window.localStorage;

  public userColors!:Colors;

  constructor(
    private readonly fb:FormBuilder,
    private readonly router:Router,
    public colors:ColorsLocalService
  ){}

  colorsForm = this.fb.group({
    firstColor: this.fb.control('#0B2447'),
    secondColor: this.fb.control('#19376D'),
    thirdColor: this.fb.control('#A5D7E8'),
    textColor: this.fb.control('#ffffff'),
    textCodeColor: this.fb.control('#ffffff')
  })

  ngOnInit(): void {
    const userSettings = this.colors.retriveLocal('userColors');
    console.log(userSettings)

    if(userSettings){
      let userColors = JSON.parse(userSettings);
      this.userColors = userColors;
      let {firstColor, secondColor, thirdColor, textColor, textCodeColor} = userColors;
      this.colorsForm.setValue({
        firstColor: firstColor,
        secondColor: secondColor,
        thirdColor: thirdColor,
        textColor: textColor,
        textCodeColor: textCodeColor
      })
      console.log(userColors)
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

  public setColor(): void{
    const colors:Colors = {
      firstColor: this.colorsForm.get('firstColor')?.value,
      secondColor: this.colorsForm.get('secondColor')?.value,
      thirdColor: this.colorsForm.get('thirdColor')?.value,
      textColor: this.colorsForm.get('textColor')?.value,
      textCodeColor: this.colorsForm.get('textCodeColor')?.value
    }

    const colorsString = JSON.stringify(colors);
    this.localStorage.setItem('userColors', colorsString);

    this.reloadRedict();
  }

  public resetColors(): void{
    this.colorsForm.setValue({
      firstColor: '#0B2447',
      secondColor: '#19376D',
      thirdColor: '#A5D7E8',
      textColor: '#19376D',
      textCodeColor: '#ffffff'
    })
  }

  private reloadRedict(): void{
    location.reload();
  }

}
