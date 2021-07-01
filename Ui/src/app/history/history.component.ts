import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderItem, OrderListItem, OrderListItemInfo } from '../models/order.model';
import { OrderService } from '../services/orders.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  subscription: Subscription;
  orderlist: OrderListItem[] = [];
  orders: OrderListItemInfo[] = [];

  constructor(public service: OrderService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.service.getOrders().subscribe(orders => {
      this.orderlist = orders;

      for (let entry of this.orderlist) {
        let items = entry.items == "Empty" ? null : JSON.parse(entry.items);

        let order:OrderListItemInfo = {
          id : entry.id,
          customer: entry.customer,
          address: entry.address,
          items: items,
          total: entry.total
        };

        this.orders.push(order);
      }
    });
  }

}
