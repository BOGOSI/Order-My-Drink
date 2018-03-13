import { Component, OnInit, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Order } from '../models/order';
import { OrderComponent } from '../order/order.component';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  orderCol: AngularFirestoreDocument<Order>;
  orderId: any;
  orderStatus: Observable<Order>;

  constructor(public afs: AngularFirestore, private route: ActivatedRoute) {
   }

  ngOnInit() {

    this.route.params.subscribe(paramas => {
      this.orderId = paramas['orderId'];
      this.getOrderStatus();
    });
  }

  getOrderStatus() {
    // Retrieve order status by Id: this.orderId
    this.orderCol = this.afs.doc('orders/' + this.orderId);
    this.orderStatus =  this.orderCol.valueChanges();
    // Assign the order status to orderStatus
    console.log(this.orderStatus);
  }

}
