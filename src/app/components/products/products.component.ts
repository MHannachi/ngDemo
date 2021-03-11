import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { map,  startWith ,catchError} from "rxjs/operators";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products$:Observable<AppDataState<Product[]>> | null=null;
readonly DataStateEnum=DataStateEnum;
  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
  }
 /* onGetAllProdcuts(){
    this.productService.getAllProducts().subscribe(data =>{
      this.products=data;
    })
  }*/
  onGetAllProducts(){
    this.products$=this.productService.getAllProducts().pipe(
     map(data=> ({ dataState: DataStateEnum.LOADED, data:data })),
     startWith({dataState:  DataStateEnum.LOADING}),
      catchError(err=> of({dataState:  DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onDeleteProdcuts(p: Product){
    this.productService.deleteProducts(p).subscribe(date=>{
     this.onGetAllProducts();
    })
   }
  onSaveProduct(p:Product){
    this.router.navigateByUrl("/newProduct")
  }

  onUpdateProduct(p:Product){
    this.router.navigateByUrl("/updateProduct/"+p.id)
    
  }

}
