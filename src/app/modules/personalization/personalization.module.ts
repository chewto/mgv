import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalizationRoutingModule } from './personalization-routing.module';
import { PersonalizationComponent } from './personalization/personalization.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalizationComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PersonalizationRoutingModule
  ]
})
export class PersonalizationModule { }
