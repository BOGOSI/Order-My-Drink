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
  orders: Observable<any>;

  OrderDoc: AngularFirestoreDocument<Order>;
  order: Observable<Order>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.orderCol = this.afs.collection('orders' , ref => ref.where('status', '==', 'Pending'));

    this.orders = this.orderCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getOrder(OrderId) {
    this.OrderDoc = this.afs.doc('posts/' + OrderId);
    this.order = this.OrderDoc.valueChanges();
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
