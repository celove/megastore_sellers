import { Component } from '@angular/core';
import { ProductService } from '../../services/auth/product.service';
import { Product } from '../../models/Product';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'primeng/blockui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, 

    AnimateOnScrollModule,
    FormsModule,
    BlockUIModule,
    DragDropModule,
    TableModule,
    TagModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  availableProducts: Product[] | undefined;

  selectedProducts: Product[] = [];

  draggedProduct: Product | undefined | null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.selectedProducts = [];
      this.productService.getProducts().then((products) => (this.availableProducts = products));
  }

  dragStart(product: Product) {
      this.draggedProduct = product;
  }

  drop() {
      if (this.draggedProduct) {
          let draggedProductIndex = this.findIndex(this.draggedProduct);
          this.selectedProducts = [...(this.selectedProducts as Product[]), this.draggedProduct];
          this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
          this.draggedProduct = null;
      }
  }

  dragEnd() {
      this.draggedProduct = null;
  }

  findIndex(product: Product) {
      let index = -1;
      for (let i = 0; i < (this.availableProducts as Product[]).length; i++) {
          if (product.id === (this.availableProducts as Product[])[i].id) {
              index = i;
              break;
          }
      }
      return index;
  } 

  getSeverity(status: string | undefined) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
              return 'contrast';
      }
  }
}
