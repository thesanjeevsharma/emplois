import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { UserService } from '../../../../services/user.service';
import { IncompleteComponent } from '../incomplete/incomplete.component';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {

  master: Boolean;
  seekerData: Object;
  username : string;

  constructor(private currRoute : ActivatedRoute, private user : UserService, public dialog : MatDialog, private data : DataService, private fb: FormBuilder, private router : Router ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.showProfile();
  }

  showProfile() {
    this.user.getSeekerProfileData(this.currRoute.snapshot.params['username']).subscribe((res) => {
      if(res['success']) {
        this.seekerData = res['data'];
        this.master = res['data']['master'] || false;
      }
      else{
        if (res['message'] == 404) {
          console.log("YES");
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
      this.seekerData = data;
      this.master = data.master || false; // User Data!      
    });
  }

}
