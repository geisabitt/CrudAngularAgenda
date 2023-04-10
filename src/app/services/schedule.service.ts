import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Contato } from '../interface/contato.model';
import { Person } from '../interface/person.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly API = '../../assets/db.json';

  //private readonly API = 'http://teste-frontend.saperx.com.br/api/schedule';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Person[]> {
    return this.httpClient.get<any>(this.API).pipe(
      map((response: { data: Person[] }) =>
        response.data.map((item: Person) => {
          return {
            id: item.id,
            name: item.name,
            numbers: item.numbers,
            email: item.email,
            cpf: item.cpf,
            date_born: item.date_born,
          };
        })
      )
    );
  }
  getPerson(id: number): Observable<Person[]> {
    const url = `${this.API}/${id}`;
    return this.httpClient.get<any>(url).pipe(
      map((response: { data: Person[] }) =>
        response.data.map((item: Person) => {
          console.log(item);
          return {
            id: item.id,
            name: item.name,
            numbers: item.numbers,
            email: item.email,
            cpf: item.cpf,
            date_born: item.date_born,
          };
        })
      )
    );
  }
  registerContact(contato: Contato): Observable<any> {
    return this.httpClient.post(this.API, contato);
  }
  createTest(formData: FormData): Observable<Person[]> {
    const headers = new HttpHeaders();
    const body = {
      name: formData.get('name'),
      numbers: formData.get('numbers'),
      email: formData.get('email'),
      cpf: formData.get('cpf'),
      date_born: formData.get('date_born'),
    };

    console.log(body);
    return this.httpClient.post<Person[]>(this.API, body, { headers: headers });
  }

  create(person: Person): Observable<Person[]> {
    const headers = new HttpHeaders();
    const mappedPerson: any = {
      name: person.name,
      email: person.email,
      cpf: person.cpf,
      date_born: person.date_born,
      number: person.numbers,
    };

    return this.httpClient
      .post<any>(this.API, mappedPerson, { headers: headers })
      .pipe();
  }
}
