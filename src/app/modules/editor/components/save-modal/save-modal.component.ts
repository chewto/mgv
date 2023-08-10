import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { Colors } from '@interfaces/colors.interface';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements OnInit {

  public userColors!: Colors;

  constructor(
    private saveDialogRef:MatDialogRef<SaveModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data : {colors: Colors}
  ){}

  ngOnInit(): void {
    this.userColors = this.data.colors;
  }

  public save(): void{
    this.saveDialogRef.close(true)
  }

  public notSave(): void{
    this.saveDialogRef.close(false)
  }
}
