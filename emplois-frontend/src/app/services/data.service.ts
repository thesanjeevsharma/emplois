import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../shared/urls';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  fetchAllJobs() {  
    return this.http.get(API + 'jobs');
  }

  fetchJob(id) {
    return this.http.get(API + 'jobs/' + id);
  }

  fetchJobsByProvider(id) {
    return this.http.get(API + 'jobs/provider/' + id);
  }

  createJob(job) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(API + 'jobs', job, httpOptions);
  }

  apply(id) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(API + 'jobs/apply', { id : id }, httpOptions);
  }

  search(query) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(API + 'jobs/search', {query : query}, httpOptions);
  }
}
