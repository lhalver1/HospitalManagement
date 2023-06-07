import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Specialty } from '../models/specialty.model';

@Injectable()
export class SpecialtyService {
    private baseUri = 'http://localhost:5238/api';

    specialties: Specialty[] = [];
    specialtySubject = new Subject<Specialty[]>();

    constructor(public modalService: NgbModal, private httpClient: HttpClient) { }

    refreshSpecialties() {
        this.getSpecialties().subscribe(specialties => {
            this.specialties = specialties;
            this.specialtySubject.next(this.specialties);
        });
    }
    
    getSpecialties(): Observable<Specialty[]> {
        let uri = this.baseUri + '/Specialty';
        return this.httpClient.get<Specialty[]>(uri)
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

}