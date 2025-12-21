import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   "name": "Kalem",
    //   "stock": 100,
    //   "price": 15
    // }).subscribe();

    //   this.httpClientService.put({
    //     controller: "products"
    //   }, {
    //     "id": "a567819b-e856-4d72-8ac2-da988b4b5755",
    //     "name": "Kalemssssssssssssssss",
    //     "stock": 65100,
    //     "price": 515
    //   }).subscribe();
    // }

    // this.httpClientService.delete({
    //   controller: "products"
    // }, "76311db2-498a-4572-8772-a765ab11c20c").subscribe();

    //farklı bir servise doğrudan istek atmak
    this.httpClientService.get({
      // baseUrl: "https://jsonplaceholder.typicode.com",
      // controller: "posts",
      fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    }).subscribe(data => console.log(data));

    
  }
}
