import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderListItem, OrderListItemInfo } from '../models/order.model';
import { OrderService } from '../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  subtotal:number = 0;
  shipping:number = 15.00;
  total:number = 0;
  taxrate:number = .075;
  taxes:number = 0;

  subscription: Subscription;
  order: OrderListItemInfo = new OrderListItemInfo();
  orderId:string = "";

  constructor(public service: OrderService,
    private route: ActivatedRoute,
    private router:Router) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');

    if (( id !== null) && (id.length > 0)) {

      this.orderId = id;

      this.subscription = this.service.getOrder(this.orderId).subscribe(entry => {
        let items = entry.items == "Empty" ? null : JSON.parse(entry.items);

        let order:OrderListItemInfo = {
          id : entry.id,
          customer: entry.customer,
          address: entry.address,
          items: items,
          total: entry.total
        };

        this.order = order;

        this.order.items = this.service.getCart();
        let subtotal:number = 0;

        this.order.items.forEach(function (item) {
          subtotal += parseFloat(item.shoe.price);
        });

        this.subtotal = subtotal;
        this.taxes = subtotal * this.taxrate;
        this.total = subtotal + this.taxes + this.shipping;
      });
    }
  }

  ngOnDestroy(): void {
  }

}
