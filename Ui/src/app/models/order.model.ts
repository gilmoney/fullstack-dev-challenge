import { ShoeListItem } from "./shoe.model";

export class OrderListItem {
  id: number = 0;
  customer: string = "";
  address: string = "";
  items: string = "";
  total: string = "";
}

export class OrderListItemInfo {
  id: number = 0;
  customer: string = "";
  address: string = "";
  items: OrderItem[] = [];
  total: string = "";
}

export interface OrderItem {
  shoe: ShoeListItem;
  size: string;
}

export interface OrderSave {
  customer: string;
  address:string;
  items: string;
  total: string;
}

export interface OrderSaveResponse{
  isSuccess:boolean;
  id: number;
}
