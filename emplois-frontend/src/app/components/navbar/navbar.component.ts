import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string;
  userType: string;
  searchForm: FormGroup;

  constructor(private data : DataService, private fb: FormBuilder, private router : Router, private flash : FlashMessagesService, private user : UserService ) { }

  ngOnInit() {
    this.createSearchForm();
  }

  logout() {
    localStorage.clear();
    this.flash.show('Successfully logged out!', { cssClass : 'alert-success' , timeout : 3000 });
    this.router.navigate(['/login']);
  }

  profile() {
    if('eProvider' == localStorage.getItem('userType')) {
      this.router.navigate(['/profile/provider/' + localStorage.getItem('username')]);
    }
    else if('eSeeker' == localStorage.getItem('userType')) {
      this.router.navigate(['/profile/seeker/' + localStorage.getItem('username')]);      
    }
    else {
      console.log('ERROR: Navigation error!');
    }
  }

  createSearchForm() {
    return this.searchForm = this.fb.group({
      query : ['', [Validators.required]]
    })
  }

  onSearchFormSubmit() {
    this.router.navigate(['/jobs/search/' + this.searchForm.value.query]);
  }

}
