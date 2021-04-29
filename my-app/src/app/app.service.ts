import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(protected http: HttpClient) {
  }

  rootURL = '/api';

  getUsers() {
    console.error(this.rootURL + '/users');
    return this.http.get(this.rootURL + '/users', { observe: 'response' });
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', {user});
  }

}
