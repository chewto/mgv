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

  ngOnInit(): void {
    const userSettings = this.retriveLocal('userColors');

    this.userColors = JSON.parse(userSettings)
    console.log(this.userColors)
  }

  private retriveLocal(key:string): string {
    const retriveLocalData = this.localStorage.getItem(key);
    return retriveLocalData ? retriveLocalData : 'no info';
  }
}
