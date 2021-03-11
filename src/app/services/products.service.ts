import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {environment} from "../../environments/environment"
import { Observable } from "rxjs";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductService{
    constructor (private http:HttpClient){}
   
    getAllProducts():Observable<Product[]>{
        let host= environment.host;
        return this.http.get<Product[]>(host+"/products")
    }
   deleteProducts(product:Product):Observable<Product[]>{
        let host= environment.host;
        return this.http.delete<Product[]>(host+"/products/"+product.id)
    }
    saveProducts(product:Product):Observable<Product[]>{
        let host= environment.host;
        return this.http.post<Product[]>(host+"/products/",product)
    }
    getProduct(id:number):Observable<Product> {
        let host= environment.host;
        return this.http.get<Product>(host+"/products/"+id)
    }
    UpdateProduct(product:Product):Observable<Product> {
        let host= environment.host;
        return this.http.put<Product>(host+"/products/"+product.id,product)
    }


}