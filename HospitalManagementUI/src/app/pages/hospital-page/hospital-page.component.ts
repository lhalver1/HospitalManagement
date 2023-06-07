import { Component } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospital-page',
  templateUrl: './hospital-page.component.html',
  styleUrls: ['./hospital-page.component.css']
})
export class HospitalPageComponent {

  constructor(private hospitalService: HospitalService) { } 

  addHospital() {
    this.hospitalService.newHospital();
  }
}
