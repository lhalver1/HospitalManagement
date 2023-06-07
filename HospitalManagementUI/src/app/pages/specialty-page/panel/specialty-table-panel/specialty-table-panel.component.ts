import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Specialty } from 'src/app/models/specialty.model';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'specialty-table-panel',
  templateUrl: './specialty-table-panel.component.html'
})
export class SpecialtyTablePanelComponent {
  public specialties: Specialty[] = [];
  private specialtySub: Subscription;

  constructor(private specialtyService: SpecialtyService) { }

  ngOnDestroy() {
    if (this.specialtySub) {
      this.specialtySub.unsubscribe();
    }
  }

  ngOnInit() {
    this.specialtySub = this.specialtyService.specialtySubject.subscribe((specialties) => {
      this.specialties = specialties;
    });
    this.specialtyService.refreshSpecialties();
  }
}
