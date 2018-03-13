import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore } from 'angularfire2/firestore' ;
@Component({
  selector: 'app-addusers',
  templateUrl: './AddUsers.component.html',
  styleUrls: ['./AddUsers.component.css']
})
export class AddUsersComponent implements OnInit {

    constructor(public af: AngularFirestore) { }

    ngOnInit( ) {

    }

    AddUser(name: string, email: string) {
      this.af.collection('users').add(
        {
          'name': name,
          'email': email
          });
          name = '';
          email = '';
    }

    AddRoom(room: string) {
      this.af.collection('rooms').add(
        {
          'room': room
        }
      );
      console.log('Room: ', room, 'Registered.');
    }

}
