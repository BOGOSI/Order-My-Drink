import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user';
import { Room } from '../models/room';
import { Order } from '../models/order';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class OrderService {


  User: Observable<User[]>;
  Room: Observable<Room[]>;
  Order: Observable<Order[]>;

  constructor(public users: AngularFirestore, public rooms: AngularFirestore, public orders: AngularFirestore) {
    this.User = this.users.collection('users').valueChanges();
    this.Room = this.rooms.collection('rooms').valueChanges();
    this.Order = this.orders.collection('orders').valueChanges();
   }

   getUsers() {
    return this.User;
  }

  getRooms() {
    return this.Room;
  }

}
