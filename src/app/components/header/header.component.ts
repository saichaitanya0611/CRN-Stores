import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NgModule } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
 public totalItem : number = 0;
 public searchTerm: string = "";

 // for toggling search icon on media view
 icon:boolean=false;
   modal:boolean=true;
    iconFunction(){
      this.icon=true;
      this.modal=false;
     
  }

 modalFunction(){
      this.modal=true;
      this.icon=false;
     
  }

  // injecting cartService for search box
  constructor(private cartService: CartService,
              public apiService: ApiService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    this.cartService.search.next(this.searchTerm)
  }

  logout() {
    console.log("hello");
    this.apiService.firstName = "";
    this.ref.detectChanges();

  }

}
