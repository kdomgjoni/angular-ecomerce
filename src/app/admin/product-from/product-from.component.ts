import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from "rxjs/operators";

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();

 


    //get the id from the url
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      //observe the ID to reference for specific product
      this.productService.get(this.id).valueChanges().subscribe(p => this.product = p);
    }
  }
  

  save(product){
    if(this.id){
      this.productService.update(this.id, product);
    }else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
    
  }

  delete(){
    if(!confirm('Are you sure that you want to delete this product')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  
  ngOnInit() {
  }

}
