import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from './services/orders.service';
import { ShoesService } from './services/shoes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WebUi';
  itemsInCart:string = "";

  constructor(public orderService: OrderService){
  }

  ngOnInit(): void {
    this.orderService.getCartItems().subscribe((count: number) => {
      this.itemsInCart = count > 0 ? count.toString() : "";
      console.log("ITEM COUNT=" + count)
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


}
