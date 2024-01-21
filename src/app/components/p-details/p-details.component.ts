import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-p-details',
  templateUrl: './p-details.component.html',
  styleUrls: ['./p-details.component.css']
})
export class PDetailsComponent implements OnInit,OnDestroy {
  public product : any = [];
  public grandTotal !: number ;
  reviewForm= new FormControl("");
  submitted: boolean;
  selectedQuantity =1;
  showWrite = true;

    constructor(private cartService: CartService, private router: Router) { }
  
    ngOnInit(): void {
      this.cartService.getProduct()
      .subscribe(res=>{
        this.product= res;
      })
    }

    addToCart(item:any){
      item.quantity = this.selectedQuantity;
      item.total = item.quantity*item.price;
      this.cartService.addToCart(item)
      this.removeItem(item);{
        this.cartService.removeAllCar()
      }
      this.router.navigate(['/', 'cart']);
    }
    removeItem(item: any){
    this.cartService.removeAllCar();
    }

    ngOnDestroy(): void {
     this.cartService.removeAllCar();
      
    }

    addReview() {
      if(this.reviewForm.value.trim() != '') {
        this.product[0].reviews.push(this.reviewForm.value);
        this.reviewForm.setValue("");
        this.showWrite = true;
      }
    }

    showAddReview() {
      this.showWrite = false;
    }
}
