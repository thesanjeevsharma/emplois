import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserService } from '../../../../services/user.service';
import { IncompleteComponent } from '../incomplete/incomplete.component';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  master: Boolean;
  providerData: Object;
  jobForm: FormGroup;
  jobs: Object[] = [];

  constructor(private currRoute : ActivatedRoute, private user : UserService, public dialog : MatDialog, private data : DataService, private fb: FormBuilder, private router : Router ) { }

  ngOnInit() {
    this.showProfile();
    this.createJobForm();
  }

  showProfile() {
    this.user.getProviderProfileData(this.currRoute.snapshot.params['username']).subscribe((res) => {
      if(res['success']) {
        this.providerData = res['data'];
        this.master = res['data']['master'] || false;
        this.getJobs(res['data']['_id']);
      }
      else{
        if (res['message'] == 404) {
          this.profileIncomplete();
        }
        else {
          console.log(res['message']);
        }
      }
    })
  }

  profileIncomplete() {
    let dialogRef = this.dialog.open(IncompleteComponent, {});
    dialogRef.afterClosed().subscribe(data => {
      this.providerData = data;
      this.master = data.master || false; // User Data!      
    });
  }

  getJobs(id) {
    this.data.fetchJobsByProvider(id).subscribe((res) => {
      this.jobs = res['data'];
    });
  }

  createJobForm() {
    return this.jobForm = this.fb.group({
      title : ['', [Validators.required]],
      salary : this.fb.group({
        min : ['', [Validators.required]],
        max : ['', [Validators.required]]
      }),
      skills : ['', [Validators.required]],
      description : ['', [Validators.required]]
    });
  }

  onJobFormSubmit() {
    let job = this.jobForm.value;
    job.skills = job.skills.split(',').map((skill) => {
      return skill.trim();
    });
    this.data.createJob(job).subscribe((res) => {
      if(res['success']) {
        console.log(res);
        document.getElementById('modal-btn').click();
        this.jobForm.reset();
        this.getJobs(res['data']['providerID']);
      }
      else {
        console.log("ERROR: ", res['message']);
      }
    });
  }

  addJobClicked() {
    document.getElementById('modal-btn').click();
  }

  openJob(id) {
    if(id) {
      this.router.navigate(['/jobs/' + id ]);
    }
  }

}
