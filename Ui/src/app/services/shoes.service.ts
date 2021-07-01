import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShoeListItem, ShoeSave, ShoeSaveResponse, UploadResponse } from '../models/shoe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {
  private apiUri = environment.apiUri;

  constructor(private http: HttpClient) { }

  getShoe(id:string) : Observable<ShoeListItem> {

    let api = `${this.apiUri}shoes/${id}/`;

    return this.http.get<ShoeListItem>(api);
  }

  getShoes() : Observable<ShoeListItem[]> {

    let api = `${this.apiUri}shoes/`;

    return this.http.get<ShoeListItem[]>(api);
  }

  addShoe(shoe: ShoeSave ) : Observable<ShoeSaveResponse> {

    let api = `${this.apiUri}shoes/`;

    return this.http.post<ShoeSaveResponse>(api, shoe);
  }

  uploadImage(filename: string, file?:File) : Observable<UploadResponse>{
    let api = `${this.apiUri}upload/${filename}`;

    return this.http.post<UploadResponse>(api, file);
  }
}
