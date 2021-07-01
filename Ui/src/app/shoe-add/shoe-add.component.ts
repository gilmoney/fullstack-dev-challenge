import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ShoeSave, UploadResponse } from '../models/shoe.model';
import { ShoesService } from '../services/shoes.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shoe-add',
  templateUrl: './shoe-add.component.html',
  styleUrls: ['./shoe-add.component.scss']
})
export class ShoeAddComponent implements OnInit, OnDestroy {
  private apiUri = environment.apiUri;

  shoeForm = this.fb.group({
    name: [null, Validators.required],
    brand: [null, Validators.required],
    price: [null, [Validators.required, Validators.min(0), Validators.max(10000)]]
  });

  hasUnitNumber = false;

  brands = [
    {name: 'Adidas', abbreviation: 'Adidas'},
    {name: 'Converse', abbreviation: 'Converse'},
    {name: 'Nike', abbreviation: 'Nike'},
    {name: 'Puma', abbreviation: 'Puma'}
  ];

  allSizes: string[] = ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5'];

  @ViewChild('sizesInput') sizesInput!: ElementRef;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;

  filteredSizes: Observable<string[]>;
  sizes: string[] = [];
  sizesCtrl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  selectedFile: File | undefined;

  subscription: Subscription;
  posterImage= "assets/img/nophoto.png";

  constructor(private fb: FormBuilder,
    public service: ShoesService,
    private router:Router,
    private snackBar: MatSnackBar,
    private http: HttpClient) {

      this.subscription = new Subscription();
      this.filteredSizes = this.sizesCtrl.valueChanges.pipe(
        startWith(null),
        map((size: string | null) => size ? this._filter(size) : this.allSizes.slice()));
  }

  ngOnInit(): void {

    this.filteredSizes = this.sizesCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.shoeForm.valid) {
      let sizes: string[] = this.sizes.map( u => { return u });

      let req:ShoeSave = {
        name : this.shoeForm.value.name,
        brand : this.shoeForm.value.brand,
        price : this.shoeForm.value.price,
        sizes : sizes.toString(),
        poster: this.posterImage
      };

      this.service.addShoe(req)
        .subscribe(
          result => {
            this.snackBar.open("Added new shoes", "Close");
            this.redirectToShoe(result.id);
          },
          error => {
            this.snackBar.open("Failed to add new shoes.  Please try again later.", "Close")
          });
    } else {
      this.validateAllFormFields(this.shoeForm); //{7}
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset(){
    this.shoeForm.reset();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.sizes.push(value.trim());
    }
  }

  remove(size: string): void {
    const index = this.sizes.indexOf(size);

    if (index >= 0) {
      this.sizes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.sizes.push(event.option.value);
    this.sizesInput.nativeElement.value = '';
    this.sizesCtrl.setValue(null);
  }

  redirectToShoe(shoeid: number ){
    this.router.navigateByUrl(`/shoes/${shoeid}`);
  }

  onFileChanged(event: any) {
    if(event.target.files.length > 0)
    {
      this.selectedFile = event.target.files[0]
      let filename:string = this.selectedFile == null ? "" : this.selectedFile.name;
      this.upload(filename)
    }
  }

  upload(filename:string) {

    //let api = `${this.apiUri}upload/${filename}`;
    /*
    let api = `http://127.0.0.1:7500/upload/${filename}`;

    this.http.post<UploadResponse>(api, this.selectedFile, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event) => {
      console.log(event); // handle event here
    });
    */

    this.subscription = this.service.uploadImage(filename, this.selectedFile).subscribe( image =>
      {
        if ( image.success )
        {
          this.posterImage = image.filename;
        }
        console.log(image);
      })
  }


  private _filter(value: any): string[] {
    const filterValue = value;

    return this.allSizes.filter(size => size.includes(filterValue));
  }
}
