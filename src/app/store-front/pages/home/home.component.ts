import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
