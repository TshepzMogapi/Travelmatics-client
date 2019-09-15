import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  


  contacts = [ 
    {
      firstName: 'Tshepiso',
      lastName: 'Mogapi',
      emailAddress: 'tm@email.com',
      type: 'Family'
    },
    {
      firstName: 'William',
      lastName: 'Rhanga',
      emailAddress: 'qwerty@domain.com',
      type: 'Work'
    },
    {
      firstName: 'Robben',
      lastName: 'Darwin',
      emailAddress: 'rm@email.com',
      type: 'Friend'
    }];

  constructor() { }

  ngOnInit() {
  }

}
