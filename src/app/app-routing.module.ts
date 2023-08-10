import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'editor',
    loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule)
  },
  {
    path:'documentation',
    loadChildren: () => import('./modules/documentation/documentation.module').then(m => m.DocumentationModule)
  },
  {
    path:'personalization',
    loadChildren: () => import('./modules/personalization/personalization.module').then(m => m.PersonalizationModule)
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
