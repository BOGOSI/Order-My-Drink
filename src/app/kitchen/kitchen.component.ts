import { Component, OnInit } from '@angular/core';
import { KitchenService} from '../services/kitchen.service';
import { OrderService} from '../services/order.service';
import { order} from '../models/order';
import { user } from '../models/user';
import { RouterModule } from '@angular/router';

import { Observable} from 'rxjs/observable';

import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})

export class KitchenComponent implements OnInit {
  orders : order[];
  orderToSend: order;

  Order:Observable<order[]>;
  

  constructor(private kservice:KitchenService,private orderservice:OrderService,public ordes:AngularFirestore) 
  {
    this.Order = this.ordes.collection('orders').valueChanges();
   }

  ngOnInit() {

   this.kservice.getOrders().subscribe(orders =>{
    this.orders = orders;});

  }
  
  details(order: order){
    this.orderToSend = order;
  }
  
  setStatus(order: order){
    this.ordes.collection("orders").doc('').set({
      status:"Accept"
    })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  }

}
