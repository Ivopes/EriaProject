import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chore } from '../models/task.model';
import { Constants } from 'src/app/config/constants';

@Injectable({ providedIn: 'root' })
export class ChoreService {

  private readonly controller: string = 'chore';

  constructor(
    private httpClient: HttpClient,
    private constants: Constants
  ) { }

  public getAll(): Observable<Chore[]> {
    return this.httpClient.get<Chore[]>(`${this.constants.API_ENDPOINT}/${this.controller}`);
  }
  public post(chore: Chore): Observable<any> {
    return this.httpClient.post(`${this.constants.API_ENDPOINT}/${this.controller}`, chore);
  }
  public delete(cID: number): Observable<any> {
    return this.httpClient.delete(`${this.constants.API_ENDPOINT}/${this.controller}/${cID}`);
  }
  public put(chore: Chore): Observable<Chore> {
    return this.httpClient.put<Chore>(`${this.constants.API_ENDPOINT}/${this.controller}`, chore);
  }
}
