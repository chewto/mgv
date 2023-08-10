import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './components/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SaveModalComponent } from './components/save-modal/save-modal.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    EditorComponent,
    SaveModalComponent
  ],
  imports: [
    MatDialogModule,
    RouterModule,
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }
