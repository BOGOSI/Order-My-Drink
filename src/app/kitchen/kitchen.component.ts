import { Component, OnInit } from '@angular/core';
import { Order} from '../models/order';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StatusService } from '../services/status.service';

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
  OrderID: string;

  constructor(private afs: AngularFirestore, public Sservice: StatusService) { }

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
    this.OrderID = OrderId;
  }

  AcceptOrder(this, OrderID) {
    this.afs.doc('orders/' + OrderID).update({'status': 'Accepted'});
    this.Sservice.Accepted();
  }

  CompleteOrder(this, OrderID) {
    this.afs.doc('orders/' + OrderID).update({'status': 'Completed'});
    this.Sservice.Completed();
  }

  DeclinedOrder(this, OrderID) {
    this.afs.doc('orders/' + OrderID).update({'status': 'Declined'});
    this.Sservice.Declined();
  }

}
