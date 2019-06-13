import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  loginUser(data) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post( API + 'users/login', data, httpOptions);
  }

  registerUser(data) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post( API + 'users/register', data, httpOptions);
  }

  getSeekerProfileData(username) {
    return this.http.get( API + 'users/profile/seeker/' + username );
  }

  getProviderProfileData(username) {
    return this.http.get( API + 'users/profile/provider/' + username );
  }

  completeProviderProfile(data) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post( API + 'users/profile', data, httpOptions );
  }

  completeSeekerProfile(data) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post( API + 'users/profile', data, httpOptions );
  }

  uploadResume(file) {
    let formData = new FormData();
    formData.append('resume', file, localStorage.getItem('username') + '.pdf');
    return this.http.post( API + 'upload', formData);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if(token) return true; else return false;
  }
}
