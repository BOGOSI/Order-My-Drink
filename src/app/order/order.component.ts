import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Order } from '../models/order';
import { Room } from '../models/room';

import { RouterModule } from '@angular/router';
import { StatusService } from '../services/status.service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {
  @Input() user;

  teaq = 0;
  coffeeq = 0;
  waterq = 0;

  date = new Date();
  orderForm: FormGroup;

  userCol: AngularFirestoreCollection<User>;
  users: Observable<any>;
  roomCol: AngularFirestoreCollection<Room>;
  rooms: Observable<any>;

  constructor(
    public af: AngularFirestore,
    public st: StatusService,
    private formBuilder: FormBuilder,
    private route: Router) {

  }

  ngOnInit() {
    this.userCol = this.af.collection('users');
    this.roomCol = this.af.collection('rooms');
    this.getUser();
    this.getRoom();
    this.createForm();
  }

  createForm() {
    this.orderForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      q: [0, []],
      q2: [0, []],
      q3: [0, []],
      room: ['', [Validators.required]]
    });
  }

  formValid(): boolean {
    const userControl = this.orderForm.controls.user as FormControl;
    const userControlValid: boolean = userControl.valid;

    const roomControl = this.orderForm.controls.room as FormControl;
    const roomControlValid: boolean = roomControl.valid;

    const quantityControl = this.orderForm.controls.q2 as FormControl;
    const q = this.orderForm.controls.q as FormControl;
    const q3 = this.orderForm.controls.q3 as FormControl;

    // const quantityControlValid: boolean = quantityControl.dirty;
    // const qValid: boolean = q.dirty;
    // const q3Valid: boolean = q3.dirty;

    // const quantitiesValid = (quantityControlValid || qValid || q3Valid);

     return (userControlValid && roomControlValid);
  }


  getUser() {
    this.users = this.userCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }


  getRoom() {
    this.rooms = this.roomCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  MakeOrder() {
    const values = this.orderForm.value;

    this.af.collection('orders').add(
      {
        'name': values.user,
        'room': values.room,
        'item': 'Tea',
        'item2': 'Coffee',
        'item3': 'Water',
        'quantity': values.q,
        'quantity2': values.q2,
        'quantity3': values.q3,
        'status': 'Pending',
        'date': this.date
        }).then(docRef => {
          this.route.navigate(['/status', docRef.id]);
        });
  }

  decreaseT(event) {
    this.teaq = this.teaq - 1;
    const control = this.orderForm.controls.q as FormControl;
    this.orderForm.patchValue({
      q: this.teaq
    });
  }

  increaseT(event) {
    this.teaq = this.teaq + 1;
    const control = this.orderForm.controls.q as FormControl;
    this.orderForm.patchValue({
      q: this.teaq
    });
  }

  decreaseC(event) {
    this.coffeeq = this.coffeeq - 1;
    const control = this.orderForm.controls.q2 as FormControl;
    this.orderForm.patchValue({
      q2: this.coffeeq
    });
   }

  increaseC(event) {
    this.coffeeq = this.coffeeq + 1;
    const control = this.orderForm.controls.q2 as FormControl;
    this.orderForm.patchValue({
      q2: this.coffeeq
    });
   }

  decreaseW(event) {
    this.waterq = this.waterq - 1;
    const control = this.orderForm.controls.q3 as FormControl;
    this.orderForm.patchValue({
      q3: this.waterq
    });
   }
  increaseW(event) {
    this.waterq = this.waterq + 1;
    const control = this.orderForm.controls.q3 as FormControl;
    this.orderForm.patchValue({
      q3: this.waterq
    });
   }

}
