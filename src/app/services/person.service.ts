import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonResponse } from '../models/person-response';
import { PersonRequest } from '../models/person-request';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personServiceUrl = 'http://localhost:8080/v1/person';
  private personServiceUrlGet = 'http://localhost:8080/v1/persons';


  constructor(private http: HttpClient) {}

  public submitForm(personRequest: PersonRequest): Observable<PersonResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.personServiceUrl, JSON.stringify(personRequest), { headers });
  }

    public getPersons(): Observable<PersonResponse> {
    return this.http.get(this.personServiceUrlGet);
  }
}
