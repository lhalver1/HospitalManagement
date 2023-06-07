import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HospitalPageComponent } from './pages/hospital-page/hospital-page.component';
import { SpecialtyPageComponent } from './pages/specialty-page/specialty-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HospitalService } from './services/hospital.service';
import { HttpClientModule } from '@angular/common/http';
import { HospitalTablePanelComponent } from './pages/hospital-page/panel/hospital-table-panel/hospital-table-panel.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HospitalEditPanelComponent } from './pages/hospital-page/panel/hospital-edit-panel/hospital-edit-panel.component';
import { SpecialtyTablePanelComponent } from './pages/specialty-page/panel/specialty-table-panel/specialty-table-panel.component';
import { SpecialtyService } from './services/specialty.service';

@NgModule({
  declarations: [
    AppComponent,
    HospitalPageComponent,
    HospitalTablePanelComponent,
    HospitalEditPanelComponent,
    SpecialtyPageComponent,
    SpecialtyTablePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HospitalService, SpecialtyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
