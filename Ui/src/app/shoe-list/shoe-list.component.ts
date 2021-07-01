import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ShoeListItem } from '../models/shoe.model';
import { ShoesService } from '../services/shoes.service';
import { ShoeListDataSource } from './shoe-list-datasource';

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoe-list.component.html',
  styleUrls: ['./shoe-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ShoeListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ShoeListItem>;
  dataSource: ShoeListDataSource;

  subscription: Subscription;
  shoes: ShoeListItem[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'brand', 'price', 'sizes'];

  constructor(public service: ShoesService) {
    this.dataSource = new ShoeListDataSource();
    this.subscription = new Subscription();
  }

  ngOnInit(){

    this.subscription = this.service.getShoes().subscribe(shoes => {
      this.shoes = shoes;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
