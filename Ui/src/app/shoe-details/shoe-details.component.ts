import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ShoesService } from '../services/shoes.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ShoeListItem, ShoeSave } from '../models/shoe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/orders.service';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.scss']
})
export class ShoeDetailsComponent implements OnInit, OnDestroy {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  shoeId: string = "";
  subscription: Subscription;
  shoes: ShoeListItem;
  sizes: string[] = [];
  selectedSize: string = "";
  posterImage: string = "/assets/img/logo.png";

  constructor(private breakpointObserver: BreakpointObserver,
    public shoeService: ShoesService,
    public orderService: OrderService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router:Router) {

      this.subscription = new Subscription();
      this.shoes = new ShoeListItem();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    if (( id !== null) && (id.length > 0))
    {
      this.shoeId = id;
      this.subscription = this.shoeService.getShoe(this.shoeId)
        .subscribe(info =>{
          if ( info != null )
          {
            this.shoes = info;

            if ((this.shoes.poster != null) && ( this.shoes.poster.length > 0)){
              this.posterImage = this.shoes.poster;
            }
            this.sizes = info.sizes.split(',');
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCart():void {

    if ( this.selectedSize == ""){
      this.snackBar.open("Please select a size.", "OK")
    }
    else
    {
      this.orderService.addShoe(this.shoes, this.selectedSize);
      this.snackBar.open("Added to Cart.", "OK")
    }
  }
}
