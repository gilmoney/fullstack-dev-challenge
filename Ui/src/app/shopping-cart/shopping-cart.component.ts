import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OrderItem } from '../models/order.model';
import { OrderService } from '../services/orders.service';
import { ShoppingCartDataSource, ShoppingCartItem } from './shopping-cart-datasource';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ShoppingCartItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  items:OrderItem[] = [];

  subtotal:number = 0;
  shipping:number = 15.00;
  total:number = 0;
  taxrate:number = .075;
  taxes:number = 0;

  constructor(public service: OrderService) {

  }

  ngOnInit(): void {
    this.items = this.service.getCart();
    let subtotal:number = 0;

    this.items.forEach(function (item) {
      subtotal += parseFloat(item.shoe.price);
    });

    this.subtotal = subtotal;
    this.taxes = subtotal * this.taxrate;
    this.total = subtotal + this.taxes + this.shipping;
  }

  ngOnDestroy(): void {
  }

  clearCart():void {
    this.service.clearCart();
    this.items = [];
  }
}
