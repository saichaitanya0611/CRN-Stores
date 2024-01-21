import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
public product : any = [];
public grandTotal !: number ;
public popup: boolean;
public popup_item: boolean;
public popup_delete: boolean;
public noItems: boolean;

public item: any;
public selected = [];

// Injecting Cart Service 
  constructor(private cartService: CartService) { }

  // getting an instance of an observable to getList Of Products/price
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.product= res;
      this.grandTotal = this.cartService.getTotalPrice()
    })
  }

  //function to remove item 
  removeItem(){
    this.popup_item = false;
    this.cartService.removeCartItem(this.item);
    this.item =null;
  }

  confirm(item: any) {
    this.item = item;
    this.popup_item = true;
  }

  // function to remove all items at once
  emptyCart(){
    this.popup = false;
    this.cartService.removeAllCart();
  }

  onCheckChange(event, i) {
    if(event.target.checked){
      this.selected.push(i);
    } else {
      const index = this.selected.indexOf(i);
      this.selected.splice(index, 1); 
    }
    console.log(this.selected);
  }

  removeItems(){
    this.popup_delete = false;
    this.cartService.removeCartItemSelected(this.selected);
    this.selected = [];
  }

  function1() {
    if(this.selected.length > 0) {
      this.popup_delete = true;
    } else {
      this.noItems = true;
    }
  }


  function2() {
    this.noItems = false;
  }
    
  
}
