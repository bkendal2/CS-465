import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { AuthenticationService } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  url = '/api/trips';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData, {
      headers: this.getAuthHeaders()
    });
  }
}