import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  showError: boolean;
  error: string;
  capsOn;
  focus;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
  ) {
  }


  autocompleteFocus() {
    this.focus = true;
  }

  autocompleteBlur() {    
    this.focus = false;
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.showError=false;
    this.error = "";
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      var users = this.apiService.users;
      const user = users.filter((a)=> a.username == this.loginForm.get("username").value);
      if(user.length == 0) {
        this.error = "Invalid Username";
        this.showError = true;
      } else {
        if(user[0].password != this.loginForm.get("password").value) {
          this.error = "Invalid Password";
          this.showError = true;
        } else {
          this.apiService.firstName = user[0].firstName;
          console.log("helo")
          this.router.navigate(['products']);

        }
      }

    }
      
  }

}
