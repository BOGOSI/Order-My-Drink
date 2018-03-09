import { Component, OnInit } from '@angular/core';

import { Order } from '../models/order';
import { OrderComponent } from '../order/order.component';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    status: string;
    orderId: any;

  constructor(public stats: StatusService) { }

  ngOnInit() {
    this.status = this.stats.status;
  }

}
