import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Job } from '../../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private data : DataService, private router : Router) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.data.fetchAllJobs().subscribe((res) => {
      if(res['success']) {
        this.jobs = res['data'];
      }
      else {
        console.log(res['message']);
      }
    })
  }

  openJob(id) {
    if(id) {
      this.router.navigate(['/jobs/' + id ]);
    }
  }

}
