import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { Chore } from '../models/task.model';
import { Kind } from '../models/kind.model';

@Injectable({providedIn: 'root'})
export class KindService {
  private readonly controller: string = 'kind';

  constructor(
    private httpClient: HttpClient,
    private constants: Constants
  ) { }

  public getAll(): Observable<Kind[]> {
    return this.httpClient.get<Kind[]>(`${this.constants.API_ENDPOINT}/${this.controller}`);
  }
  public post(kind: Kind): Observable<any> {
    return this.httpClient.post(`${this.constants.API_ENDPOINT}/${this.controller}`, kind);
  }
}
