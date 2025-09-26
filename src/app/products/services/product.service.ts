import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Options } from '@products/interfaces/options';
import { Product, ProductsResponse } from '@products/interfaces/product-response';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();

  private productCache = new Map<string, Product>();

  constructor() { }

  getProducts(options: Options): Observable<ProductsResponse>{

    const { limit = 9, offset = 0, gender = ''} = options;

    const key = `${limit}-${offset}-${gender}`;

    if ( this.productsCache.has(key) ) {
      return of(this.productsCache.get(key)!);
    }

    return this.http.get<ProductsResponse>(
      `${environment.baseUrl}/products`,
      {
        params: {limit, offset, gender}
      }
    ).pipe(
      tap(console.log),
      tap((resp) => this.productsCache.set(key, resp))
    );
  }

  getProductById (id: string): Observable<Product> {
    if ( this.productCache.has(id) ) {
      return of(this.productCache.get(id)!);
    }
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`)
    .pipe(
      tap(console.log),
      tap((resp) => this.productCache.set(resp.slug, resp))
    );
  }
}
