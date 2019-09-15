import { Component, OnInit ,Injector} from '@angular/core';

import { MatDialog } from '@angular/material';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  isAppMobile = false;

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

  constructor( 
    
    private _dialog: MatDialog) {

    
   }

  ngOnInit() {
    this.isAppMobile = this.isDeviceMobile(window);
  }

  addContact() {
    this.manageContactList();
  }

  editContact(contactDto: any) {

    this.manageContactList(5);


  }

  private manageContactList(id?: number): void {

    let createOrEditContactDialog;
    if (id === undefined || id <= 0) {
        createOrEditContactDialog = this._dialog.open(CreateContactComponent);
    } 
    
    else {
        createOrEditContactDialog = this._dialog.open(EditContactComponent, {
            data: id
        });
    }

    // createOrEditContactDialog.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.refresh();
    //     }
    // });
}

isDeviceMobile(window): boolean {

  if (window.outerWidth < 400) {
      return true;
  } else {
      return false;
  }

}

}
