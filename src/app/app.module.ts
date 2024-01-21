import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PDetailsComponent } from './components/p-details/p-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { APP_INITIALIZER } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent, TrackCapsDirective } from './components/registration/registration.component';
import { RatingModule, StarRatingComponent } from 'ng-starrating';
import { HelpComponent } from './components/help/help.component';
import {MatIconModule} from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

// import { NgSelectModule } from "@ng-select/ng-select"; 
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    FilterPipe,
    PDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    TrackCapsDirective,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    RatingModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatFormFieldModule
    // NgSelectModule
    // NgMultiSelectDropDownModule
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [
    {
      provide: APP_INITIALIZER, 
      useValue: () =>  new Promise(resolve =>
        setTimeout(resolve, 100)
      ),
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
