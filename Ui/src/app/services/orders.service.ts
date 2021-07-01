import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderItem, OrderListItem, OrderSave, OrderSaveResponse } from '../models/order.model';
import { ShoeListItem, ShoeSave, ShoeSaveResponse } from '../models/shoe.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUri = environment.apiUri;
  private itemsInCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  cartItems: OrderItem[] = [];
  shoes: ShoeListItem[] = [];

  constructor(private http: HttpClient) { }

  getOrder(id:string) : Observable<OrderListItem> {

    let api = `${this.apiUri}orders/${id}/`;

    return this.http.get<OrderListItem>(api);
  }

  getOrders() : Observable<OrderListItem[]> {

    let api = `${this.apiUri}orders/`;

    return this.http.get<OrderListItem[]>(api);
  }

  addShoe(shoe: ShoeListItem, size: string) {

    this.cartItems.push({ shoe : shoe, size: size});

    localStorage.setItem("shopping-cart", JSON.stringify(this.cartItems));

    this.itemsInCart.next(this.cartItems.length);
  }

  getCart(): OrderItem[]{

    this.loadCart();

    return this.cartItems;
  }

  clearCart():void {

    this.cartItems = [];
    localStorage.removeItem("shopping-cart");

    this.itemsInCart.next(this.cartItems.length);
  }

  loadCart(): void {

    let json = localStorage.getItem("shopping-cart");
    this.cartItems = json !== null ? JSON.parse(json) : [];

    this.itemsInCart.next(this.cartItems.length);
  }

  checkOut(customer: string, address: string) : Observable<OrderSaveResponse> {

    let api = `${this.apiUri}orders/`;
    let cartItems = JSON.stringify(this.cartItems);
    let total:string = this.getTotal().toFixed(2).toString();

    let order:OrderSave = {
      customer: customer,
      address: address,
      items: cartItems,
      total: total
    };

    return this.http.post<OrderSaveResponse>(api, order);
  }

  getTotal(): number {

    let subtotal:number = 0;
    let total:number = 0;

    this.cartItems.forEach(function (item) {
      subtotal += parseFloat(item.shoe.price);
    });

    let taxes = subtotal * .075;
    total = subtotal + taxes + 15.00;

    return total;
  }

  getCartItems() : Observable<number> {
    this.loadCart();

    return this.itemsInCart.asObservable();
  }
}
