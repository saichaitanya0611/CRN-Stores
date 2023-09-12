import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { PDetailsComponent } from './components/p-details/p-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
const routes: Routes = [
  {path:"",redirectTo:"products", pathMatch:"full"},
  {path:"products", component:ProductComponent},
  {path:"cart", component:CartComponent},
  {path:"pd", component:PDetailsComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
