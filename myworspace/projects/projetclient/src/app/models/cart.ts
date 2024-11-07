import { Product } from "./product";

export interface Cart {
  
    id: number;
    qtetotal: number;
    price_total: number;
    qte_user: number;
    products: Product[];
}
