import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users: any[] = [
    {
      username: "chaitanya",
      password: "Chaitanya@123",
      firstName: "Chaitanya",
      lastName: "Srirangam"
    },
    {
      username: "nainika",
      password: "Nainika@123",
      firstName: "Nainika",
      lastName: "Gaddam"
    },
    {
      username: "rithika",
      password: "rithika@123",
      firstName: "Rithika",
      lastName: "Gouni"
    }
  ];

  firstName: string;
  
  constructor(private http: HttpClient) {
  }
  // getProduct(){
  //   return this.http.get<any>("https://fakestoreapi.com/products/")
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }

  getProduct(){
    return this.http.get<any>("/assets/products.json")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
}
