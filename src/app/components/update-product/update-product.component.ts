import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSequence } from 'protractor';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productId: number;
  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private productService:ProductService,
              private router: Router,
              private fb : FormBuilder,
              private acitavetedRoute:ActivatedRoute) { 
    this.productId= acitavetedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(
      product =>{
        this.productFormGroup = this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]  
        });
      })
    
    }
    onUpdateProduct(){
    this.productService.UpdateProduct(this.productFormGroup?.value)
    .subscribe(data=>{
      alert("update succes");
    
    });

  }

}
