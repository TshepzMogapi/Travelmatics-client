import { Component, OnInit ,Injector} from '@angular/core';

import { MatDialog } from '@angular/material';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
import { ConfirmationDialog } from './contact/confirmation-dialog';
import { UtilService } from '@app/util.service';


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
      webAddress: 'tshepzmogapi.com',
      type: 'Family'
    },
    {
      firstName: 'William',
      lastName: 'Rhanga',
      emailAddress: 'qwerty@domain.com',
      webAddress: 'afl.com.au',
      type: 'Work'
    },
    {
      firstName: 'Robben',
      lastName: 'Darwin',
      emailAddress: 'rm@email.com',
      webAddress: 'google.com',
      type: 'Friend'
    }];

  constructor(
    public utilService: UtilService,

    private _dialog: MatDialog

    ) {


   }

  ngOnInit() {
    this.isAppMobile = this.utilService.isDeviceMobile(window);
  }

  addContact() {
    this.manageContactList();
  }

  openDialog() {

    const dialogRef = this._dialog.open(ConfirmationDialog);
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmDelete: boolean) => {

      if(confirmDelete) {
        console.log('Deleting stuff');
      } else{
        console.log('Nothing will happen');

      }

    });
  }

  deleteContact() {

    this.openDialog();

    console.log("Are U sure");

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


}
