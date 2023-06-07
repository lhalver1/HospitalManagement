import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HospitalEditPanelComponent } from '../pages/hospital-page/panel/hospital-edit-panel/hospital-edit-panel.component';
import { Specialty } from '../models/specialty.model';

@Injectable()
export class HospitalService {
    private baseUri = 'http://localhost:5238/api';

    public modalRef: any;

    hospitals: Hospital[] = [];
    hospitalSubject = new Subject<Hospital[]>();
    specialties: Specialty[] = [];
    specialtySubject = new Subject<Specialty[]>();

    constructor(public modalService: NgbModal, private httpClient: HttpClient) { 
        this.getSpecialties().subscribe(specialties => {
            this.specialties = specialties;
        });
    }

    refreshHospitals() {
        this.getHospitals().subscribe(hospitals => {
            this.hospitals = hospitals;
            this.hospitalSubject.next(this.hospitals);
        });
    }

    getHospitals(): Observable<Hospital[]> {
        let uri = this.baseUri + '/Hospital';
        return this.httpClient.get<Hospital[]>(uri)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    getSpecialties(): Observable<Specialty[]> {
        let uri = this.baseUri + '/Specialty';
        return this.httpClient.get<Specialty[]>(uri)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    saveHospital(hospital: Hospital): Observable<Hospital> {
        let uri = this.baseUri + '/Hospital';
        if(hospital.id == -1) {
            // POST new hospital
            delete hospital.id;
            return this.httpClient.post<Hospital>(uri, hospital)
            .pipe(
                catchError(this.handleError)
            );
        } else {
            // PUT update hospital
            return this.httpClient.put<Hospital>(uri, hospital)
            .pipe(
                catchError(this.handleError)
            );
        }
    }
    
    deleteHospital(hospitalID: string): Observable<boolean> {
        let uri = this.baseUri + '/Hospital' + '/' + hospitalID;
        return this.httpClient.delete<boolean>(uri)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    modalEditHospital(hospital: Hospital) {
        this.modalRef = this.modalService.open(HospitalEditPanelComponent, { 
            centered: true,
            size: 'lg',
            backdrop: 'static'
        });
        this.modalRef.componentInstance.hospital = hospital;
    }

    newHospital() {
        let newHospital: Hospital = {
            id: -1,
            name: '',
            address: '',
            phone: '',
            manager: '',
            specialty_ID: 0,
            specialty: {
                id: 0,
                name: '',
                hospital: []
            }
        };
        this.modalEditHospital(newHospital);
    }

}