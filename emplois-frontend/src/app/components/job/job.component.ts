import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { JobDetailed } from '../../shared/models';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'q';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  job: JobDetailed;
  applicants: Object[];
  userType: string;

  constructor(private router : Router, private currRouter : ActivatedRoute, private data : DataService, private flash : FlashMessagesService) { }

  ngOnInit() {
    this.getJob();
    this.userType = localStorage.getItem('userType');
  }

  getJob() {
    this.data.fetchJob(this.currRouter.snapshot.params['id']).subscribe((res) => {
      if(res['success']) {
        console.log(res['data']);
        this.job = res['data'];
        this.applicants = res['data']['applicants'];
      }
      else {
        console.log(res['message']);
      }
    });
  }

  apply() {
    this.data.apply(this.job['_id']).subscribe((res) => {
      if(res['success']) {
        this.flash.show('Applied!', { cssClass : 'alert-success' , timeout : 3000 });
      } 
      else {
        if(res['message'] == 403) {
          this.flash.show("You're not logged in.", { cssClass : 'alert-danger' , timeout : 3000 });
          this.router.navigate(['/login']);
        }
        else {
          this.flash.show(res['message'], { cssClass : 'alert-danger' , timeout : 3000 });                
        }
      } 
    });
  }

}
