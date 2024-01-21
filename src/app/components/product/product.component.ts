import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modal') content: any;
public productList : any ;
public productLis : any ;
public filterCategory:  any;
public searchTerm: string = "";
public category:string = "";
public selectedQuantities: number[] = [];
public quantities = [1, 2, 3, 4, 5];


searchKey:string =""
icon:boolean=false;
   modal:boolean=true;
   

// Imjecting cart service
  constructor(private api: ApiService, private cartService : CartService,private router: Router, private ref: ChangeDetectorRef) { }

  //function to add to cart and filtering products on initialization
  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res ;
      this.filterCategory = res
      this.productList.forEach((a:any) => {
        if(a.category === "women's clothing" || a.category === "men's clothing" ){
          a.category = "fashion"
        }
        Object.assign(a,{quantity:1,total:a.price})
      });
      console.log(this.productList)
    })
    this.api.getProduct()
    .subscribe(res=>{
      this.productLis = res ;
      
    })
    this.cartService.search.subscribe(val=>{
      this.searchKey = val
    })
  }

  iconFunction(){
    this.icon=true;
    this.modal=false;
   
}

modalFunction(){
    this.modal=true;
    this.icon=false;
   
}

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    // this.cartService.search.next(this.searchTerm)
    this.searchKey = this.searchTerm ;
  }

  addToCart(item:any, i:any){
    item.quantity = !!this.selectedQuantities[i]? this.selectedQuantities[i] : 1;
    item.total = item.quantity*item.price;

    this.cartService.addToCart(item);
    setTimeout(()=>{this.content.nativeElement.click()}, 800);
    
  }

  filter(event:any){
    this.category = event.target.value;
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category ===  this.category || this.category === ""){
        return a;
      }
    })
  }

  sort(event:any){
    let value = event.target.value;
    if(value=="") {
      this.filterCategory = this.productLis
      .filter((a:any)=>{
        if(a.category ===  this.category || this.category === ""){
          return a;
        }
      })
      console.log(this.filterCategory);
    } else if(value=="pricelh"){
      this.filterCategory  = this.filterCategory.sort((a, b) => a.price - b.price);
      this.filterCategory = this.filterCategory
      .filter((a:any)=>{
        if(a.category ===  this.category || this.category === ""){
          return a;
        }
      })
      console.log(this.filterCategory);

    } else if(value=="pricehl"){
      this.filterCategory  = this.filterCategory.sort((a, b) => b.price - a.price);
      this.filterCategory = this.filterCategory
      .filter((a:any)=>{
        if(a.category ===  this.category || this.category === ""){
          return a;
        }
      })
      
    } else if(value=="rating"){
      this.filterCategory  = this.filterCategory.sort((a, b) => b.rating.rate - a.rating.rate);
      this.filterCategory = this.filterCategory
      .filter((a:any)=>{
        if(a.category ===  this.category || this.category === ""){
          return a;
        }
      })
      
    } 
    this.ref.detectChanges();

  }

  // this is to view product details..
  addToCar(item:any){
    this.cartService.addToCar(item)
  }
  addTopd(item:any){
    this.cartService.addToCar(item)
    this.router.navigate(['pd'])
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
