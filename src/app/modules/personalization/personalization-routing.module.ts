import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalizationComponent } from './personalization/personalization.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalizationRoutingModule { }
