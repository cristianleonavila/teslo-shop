import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product',
  imports: [ProductCarouselComponent],
  templateUrl: './product.component.html',
  styles: ``
})
export class ProductComponent {

  activatedRoute = inject(ActivatedRoute);

  productService = inject(ProductService);

  productId:string = this.activatedRoute.snapshot.params['slugId'];

  productResource = rxResource({
    request: () => ({idSlug: this.productId}),
    loader: ({request}) => {
      return this.productService.getProductById(request.idSlug);
    }
  });
}
