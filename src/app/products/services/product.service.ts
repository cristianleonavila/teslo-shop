import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Options } from '@products/interfaces/options';
import { Product, ProductsResponse } from '@products/interfaces/product-response';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(options: Options): Observable<ProductsResponse>{

    const { limit = 9, offset = 0, gender = ''} = options;

    return this.http.get<ProductsResponse>(
      `${environment.baseUrl}/products`,
      {
        params: {limit, offset, gender}
      }
    ).pipe(
      tap(console.log)
    );
  }

  getProductById (id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`);
  }
}
