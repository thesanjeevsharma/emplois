import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private user : UserService, private router : Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    return this.registerForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      username : ['', [Validators.required]],
      password : ['', [Validators.required]],
      userType : ['', [Validators.required]]
    });
  }

  onRegisterFormSubmit() {
    console.log(this.registerForm.value);
    this.user.registerUser(this.registerForm.value).subscribe((res) => {
      if(res['success']) {
        console.log(res);
        localStorage.setItem('token', res['data']['token']);
        localStorage.setItem('username', res['data']['username']);
        localStorage.setItem('userType', res['data']['userType']);
        if(this.registerForm.value.userType === 'eProvider') {
          this.router.navigate(['/profile/provider/' + res['data']['username']]);
        }
        else if (this.registerForm.value.userType === 'eSeeker') {
          this.router.navigate(['/profile/seeker/' + res['data']['username']]);          
        }
        else {
          console.log('userType Error.');
        }
      }
    })
  }

}
