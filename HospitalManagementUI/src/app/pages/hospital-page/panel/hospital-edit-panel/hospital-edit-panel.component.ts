import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Specialty } from 'src/app/models/specialty.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'hospital-edit-panel',
  templateUrl: './hospital-edit-panel.component.html'
})
export class HospitalEditPanelComponent {
    @Input()
    hospital: any;

    specialties: Specialty[] = [];
    form: FormGroup;

    constructor(private hospitalService: HospitalService, public activeModal: NgbActiveModal) { 
       this.form = new FormGroup({
                id: new FormControl(''),
                name: new FormControl(''),
                address: new FormControl(''),
                phone: new FormControl(''),
                manager: new FormControl(''),
                specialty_ID: new FormControl('')
        });
    }

    ngOnInit() {
        this.setFormGroupData();
        this.specialties = this.hospitalService.specialties;
    }

    setFormGroupData() {
        this.form.setValue(
        {
            id: this.hospital.id,
            name: this.hospital.name,
            address: this.hospital.address,
            phone: this.hospital.phone,
            manager: this.hospital.manager,
            specialty_ID: this.hospital.specialty_ID
        })
    }

    delete() {
        let hospitalID = this.form.controls['id'].value;
        this.hospitalService.deleteHospital(hospitalID).subscribe(result => {
            this.hospitalService.refreshHospitals();
            this.activeModal.close(true);
        });
    }
    
    cancel() {
        this.activeModal.close(false);
    }
    
    proceed() {
        let hospital = this.form.value;
        this.hospitalService.saveHospital(hospital).subscribe(hospital => {
            this.hospitalService.refreshHospitals();
            this.activeModal.close(true);
        });
    }
}
