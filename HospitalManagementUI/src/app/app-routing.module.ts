import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalPageComponent } from './pages/hospital-page/hospital-page.component';
import { SpecialtyPageComponent } from './pages/specialty-page/specialty-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/hospital', pathMatch: 'full' },
  { path: 'hospital', component: HospitalPageComponent },
  { path: 'specialty', component: SpecialtyPageComponent },
  { path: '**', redirectTo: '/hospital', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }