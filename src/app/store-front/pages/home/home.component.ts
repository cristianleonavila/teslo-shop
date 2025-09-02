import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductService } from '@products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  productService = inject(ProductService)

  productResource = rxResource({
    request: () => ({}),
    loader: ({request}) => {
      return this.productService.getProducts({limit: 9});
    }
  })
}
