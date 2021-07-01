import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { ShoeAddComponent } from './shoe-add/shoe-add.component';
import { ShoeDetailsComponent } from './shoe-details/shoe-details.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'shoes', pathMatch: 'full' },
  { path: 'shoes',component: ShoeListComponent },
  { path: 'shoes/:id',component: ShoeDetailsComponent },
  { path: 'new-shoes',component: ShoeAddComponent },
  { path: 'cart',component: ShoppingCartComponent },
  { path: 'history',component: HistoryComponent},
  { path: 'checkout',component: CheckoutComponent},
  { path: 'order/:id',component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
