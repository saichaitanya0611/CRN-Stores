import { Component, Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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
  capsOn1;
  capsOn2;
  focus1;
  focus2;


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
          streetAddress: [''],
          city: [''],
          state: [''],
          zip: [''],
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
  autocompleteFocus() {
    this.focus1 = true;
  }

  autocompleteBlur() {    
    this.focus1 = false;
  }

  autocompleteFocus2() {
    this.focus2 = true;
  }

  autocompleteBlur2() {    
    this.focus2 = false;
  }

}


@Directive({ selector: '[capsLock]' })
export class TrackCapsDirective {
 
  @Output('capsLock') capsLock = new EventEmitter<Boolean>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
  //  this.capsLock.emit(event.getModifierState && event.getModifierState('CapsLock'));
  this.capsLock.emit(this.capS(event))
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
     this.capsLock.emit(this.capS(event))
   // this.capsLock.emit(event.getModifierState && event.getModifierState('CapsLock'));
  }

  capS(e){
var s = String.fromCharCode( e.which );
    if (
      (s.toUpperCase() === s && s.toLowerCase() !== s && e.shiftKey) || //caps is on
      (s.toUpperCase() !== s && s.toLowerCase() === s && e.shiftKey) || 
      e.getModifierState('CapsLock')
      )  { return true; }  
    return false;
}

}
