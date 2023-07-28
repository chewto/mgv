import { Component, OnInit } from '@angular/core';
import { Colors } from '@interfaces/colors.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  private localStorage = window.localStorage;

  public userColors!:Colors;

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
