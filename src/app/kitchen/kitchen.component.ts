import { Component, OnInit } from '@angular/core';
import { KitchenService} from '../services/kitchen.service';
import { order} from '../models/order';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  orders : order[];
  orderToSend: order;

  constructor(private orderservice:KitchenService) { }

  ngOnInit() {
   this.orderservice.getOrders().subscribe(orders =>{
    this.orders = orders;
  });
  }
  
  details(order: order){
    this.orderToSend = order;
  }

}
