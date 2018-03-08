import { Component, OnInit } from '@angular/core';
import { Order} from '../models/order';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  orderCol: AngularFirestoreCollection<Order>;
  orders: any;

  OrderDoc: AngularFirestoreDocument<Order>;
  OrderDetails: Observable<Order>;
  date: Date;


  constructor(private afs: AngularFirestore) { }

  ngOnInit() {

  this.date = new Date();
    this.orderCol = this.afs.collection('orders' , ref => ref.where('status', '==', 'Pending').orderBy('date').limit(10));
    this.orders =  this.orderCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });

  }

  getOrder(OrderId) {

    this.OrderDoc = this.afs.doc('orders/' + OrderId);
    this.OrderDetails = this.OrderDoc.valueChanges();
    console.log(this.OrderDetails);
  }

  AcceptOrder(OrderId) {
    this.afs.doc('orders/' + OrderId).update({'status': 'Accepted'});
    console.log(OrderId, ' Status Updated');
  }

  CompleteOrder(OrderId) {
    this.afs.doc('orders/' + OrderId).update({'status': 'Complete'});
    console.log(OrderId, ' Status Updated');

  }

  DeclinedOrder(OrderId) {
    this.afs.doc('orders/' + OrderId).update({'status': 'Declined'});
    console.log(OrderId, ' Status Updated');

  }

}
