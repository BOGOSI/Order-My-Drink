import { Component, OnInit, Input  } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Order} from '../models/order';
import { Observable} from 'rxjs/observable';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
    @Input()

    Order: AngularFirestoreCollection<Order> ;
    orders: any;
    constructor(private af: AngularFirestore ) {

    }

    ngOnInit() {
      this.Order = this.af.collection('orders');
      this.orders = this.Order.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
     }


    AcceptOrder(Acceptedorder: Order) {

    }

  }
