import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'hospital-table-panel',
  templateUrl: './hospital-table-panel.component.html'
})
export class HospitalTablePanelComponent {
  public hospitals: Hospital[] = [];
  private hospitalSub: Subscription;

  constructor(private hospitalService: HospitalService) { }

  ngOnDestroy() {
    if (this.hospitalSub) {
      this.hospitalSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.hospitalSub = this.hospitalService.hospitalSubject.subscribe((hospitals) => {
      this.hospitals = hospitals;
    });
    this.hospitalService.refreshHospitals();
  }

  hospitalRowClicked(hospital: Hospital) {
      this.hospitalService.modalEditHospital(hospital);
  }
}
