import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb : FormBuilder, private user : UserService, private router : Router, private flash : FlashMessagesService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    return this.loginForm = this.fb.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }

  onLoginFormSubmit() {
    this.user.loginUser(this.loginForm.value).subscribe((res) => {
      if(res['success']) {
        localStorage.setItem('token', res['data']['token']);
        localStorage.setItem('userType', res['data']['userType']);
        localStorage.setItem('username', res['data']['username']);
        if( res['data']['userType'] === 'eProvider' ) {
          this.flash.show('Welcome, Recruiter!', { cssClass : 'alert-success', timeout : 3000 });          
          this.router.navigate(['/profile/provider/' + res['data']['username']])
        }
        else if( res['data']['userType'] === 'eSeeker' ) {
          this.flash.show(`Hello, ${res['data']['username']}!`, { cssClass : 'alert-success', timeout : 3000 });          
          this.router.navigate(['/'])
        }
        else {
          console.log('userType Error.');
        }
      }
      else {
        this.flash.show(res['message'], { cssClass : 'alert-danger', timeout : 3000 });
      }
    })
  }

}
