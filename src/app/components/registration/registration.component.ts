import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
  ) {
  }

  ngOnInit() {
      this.registrationForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          streetAddress: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.required],
          telephone: ['', Validators.required],
          email: ['', Validators.required],
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    } else {
      this.apiService.users.push({
        username: this.registrationForm.get("username").value,
        password: this.registrationForm.get("password").value,
        firstName: this.registrationForm.get("firstName").value,
        lastName: this.registrationForm.get("lastName").value
      })
      console.log("hello")
      this.router.navigate(['login']);
    }
      
  }

}
