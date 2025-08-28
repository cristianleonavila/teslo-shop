import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '@products/interfaces/product-response';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(
      `${environment.baseUrl}/products`
    ).pipe(
      tap(console.log)
    );
  }

  constructor() { }
}
