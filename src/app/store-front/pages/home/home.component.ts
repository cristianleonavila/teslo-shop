import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductService } from '@products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  productService = inject(ProductService);

  paginationService = inject(PaginationService);

  productResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1}),
    loader: ({request}) => {
      return this.productService.getProducts({
        limit: 9,
        offset: request.page * 9
      });
    }
  })
}
