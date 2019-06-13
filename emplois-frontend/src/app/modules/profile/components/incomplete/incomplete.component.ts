import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-incomplete',
  templateUrl: './incomplete.component.html',
  styleUrls: ['./incomplete.component.scss']
})
export class IncompleteComponent implements OnInit {

  userType: string;
  providerProfileForm: FormGroup;
  seekerProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private user: UserService, private router : Router, private dialogRef:MatDialogRef<IncompleteComponent>) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    if(this.userType === 'eProvider') {
      this.createProviderProfileForm();
    }
    else {
      this.createSeekerProfileForm();      
    }
  }

  createProviderProfileForm() {
    return this.providerProfileForm = this.fb.group({
      company : ['', [Validators.required]],
      employeeCount : ['', [Validators.required]],
      established : ['', [Validators.required]],
      location : this.fb.group({
        city : ['', [Validators.required]],
        state : ['', [Validators.required]],
        country : ['', [Validators.required]]
      }),
      about : ['', [Validators.required]]
    });
  }

  createSeekerProfileForm() {
    return this.seekerProfileForm = this.fb.group({
      name : this.fb.group({
        first : ['', [Validators.required]],
        last : ['', [Validators.required]]
      }),
      resume : ['', [Validators.required]],
      location : this.fb.group({
        city : ['', [Validators.required]],
        state : ['', [Validators.required]],
        country : ['', [Validators.required]]
      }),
      skills : ['', [Validators.required]]
    });
  }

  onProviderProfileFormSubmit() {
    console.log(this.providerProfileForm.value);
    this.user.completeProviderProfile(this.providerProfileForm.value).subscribe((res) => {
      if(res['success']) {
          console.log("SERVER RESPONSE")
        if( this.userType === 'eProvider' ) {
          console.log(res);
          this.dialogRef.close(res['data']);
        }
        else if( this.userType === 'eSeeker' ) {
          console.log(res);
          this.dialogRef.close(res['data']);
        }
        else {
          console.log('userType Error.');
        }
      }
      else {
        console.log("ERROR: ", res['message']);
      }
    })
  }

  onSeekeerProfileFormSubmit() {
    console.log(this.seekerProfileForm.value);
    let seeker = this.seekerProfileForm.value;
    seeker.skills = seeker.skills.split(',').map((skill) => {
      return skill.trim();
    });
    this.user.completeSeekerProfile(seeker).subscribe((res) => {
      if(res['success']) {
        console.log("SERVER RESPONSE")
      if( this.userType === 'eProvider') {
        console.log(res);
        this.dialogRef.close(res['data']);
      }
      else if( this.userType === 'eSeeker') {
        console.log(res);
        this.dialogRef.close(res['data']);
      }
      else {
        console.log('userType Error.');
      }
    }
    else {
      console.log("ERROR: ", res['message']);
    }
    })
  }

  resumeUpload(event) {
    console.log(event.target.files[0]);
    if(event.target.files[0].type == 'application/pdf') {
      this.user.uploadResume(event.target.files[0]).subscribe((res) => {
        this.seekerProfileForm.patchValue({
          resume : res['data']['filename']
        })
      })
    }
    else {
      alert('Only PDFs allowed!');
    }
  }
}
