import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender',
  imports: [ProductCardComponent],
  templateUrl: './gender.component.html',
  styles: ``
})
export class GenderComponent {

  route = inject(ActivatedRoute);

  productService = inject(ProductService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender)
  ));

  productResource = rxResource({
    request: () => ({gender: this.gender()}),
    loader: ({request}) => {
      return this.productService.getProducts({limit: 9, gender: request.gender});
    }
  })
}
