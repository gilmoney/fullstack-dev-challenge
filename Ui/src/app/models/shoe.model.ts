export class ShoeListItem {
  id: number = 0;
  name: string = "";
  price: string = "";
  brand: string = "";
  sizes: string = "";
  poster:string = "";
}

export interface ShoeSave {
  name: string;
  price: string;
  brand: string;
  sizes: string;
  poster:string;
}

export interface ShoeSaveResponse{
  isSuccess:boolean;
  id: number;
  name: string;
  price: string;
  brand: string;
  sizes: string;
  poster:string;
}

export interface UploadResponse{
  filename:string;
  success:boolean;
}
