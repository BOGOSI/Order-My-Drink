import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator } from '@angular/forms';
import { User } from '../models/user';
import { AngularFirestore } from 'angularfire2/firestore' ;
@Component({
  selector: 'app-addusers',
  templateUrl: './AddUsers.component.html',
  styleUrls: ['./AddUsers.component.css']
})
export class AddUsersComponent implements OnInit {

  userForm: FormGroup;
  roomForm: FormGroup;

  roomSuccess: string;
  userSuccess: string;

    constructor(
      public af: AngularFirestore,
      private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
      this.createUserForm();
      this.createRoomForm();
      this.roomSuccess = '';
      this.userSuccess = '';
    }

    createUserForm() {
      this.userForm = this.formBuilder.group({
        user: ['', []],
        email: ['', []]
      });
    }

    createRoomForm() {
      this.roomForm = this.formBuilder.group({
        newroom: ['', []]
      });
    }

    AddUser() {
      const values = this.userForm.value;
      this.af.collection('users').add(
        {
          'name': values.user,
          'email': values.email
          });
      this.userSuccess = 'Success';
      this.createUserForm();
    }

    AddRoom() {
      const values = this.roomForm.value;
      this.af.collection('rooms').add(
        {
          'room': values.newroom
        }
      );
      this.roomSuccess = 'Success';
      this.createRoomForm();
    }

    refresh() {
      this.roomSuccess = '';
      this.userSuccess = '';
    }

}
