import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {
    if (!products || !searchText) {
      return products;
    }
    searchText = searchText.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchText) ||
      product.ref.toLowerCase().includes(searchText) ||
      product.color.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)||
      product.price.toString().includes(searchText) 
      
    );
  }

}
