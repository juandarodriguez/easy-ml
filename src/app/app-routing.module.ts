import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModelComponent } from './components/model/model.component';

const routes: Routes = [
  {path: 'modelo', component: ModelComponent},
  {
    path: '',
    redirectTo: '/modelo',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
