import { Component, OnInit ,Injector} from '@angular/core';

import { MatDialog } from '@angular/material';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
import { ConfirmationDialog } from './contact/confirmation-dialog';
import { UtilService } from '@app/util.service';
import { ContactServiceProxy, ContactDto } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@app/local-storage.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  isAppMobile = false;

  dbContacts: ContactDto[];

  firstName: string;

  contacts: any[];

  constructor(
    public utilService: UtilService,

    private localStoreService: LocalStorageService,

    private contactService: ContactServiceProxy,

    private _dialog: MatDialog

    ) {


   }

  ngOnInit() {

    this.contacts = this.localStoreService.getContacts();


    this.isAppMobile = this.utilService.isDeviceMobile(window);
  }




  addContact() {

    this.manageContactList();
  }

  openDialog(contact) {

    const dialogRef = this._dialog.open(ConfirmationDialog);

    dialogRef.afterClosed().subscribe((confirmDelete: boolean) => {

      if(confirmDelete) {

        this.localStoreService.deleteContact(contact.id)

      } else{
        console.log('Nothing will happen');

      }

    });
  }

  deleteContact(contact) {

    this.openDialog(contact);

    console.log("Are U sure");

  }

  editContact(contact: any) {

    this.manageContactList(contact);

  }

  private manageContactList(contact?: number): void {

    let createOrEditContactDialog;
    if (contact === undefined ) {
        createOrEditContactDialog = this._dialog.open(CreateContactComponent);
    }

    else {
        createOrEditContactDialog = this._dialog.open(EditContactComponent, {
            data: contact
        });
    }

    // createOrEditContactDialog.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.refresh();
    //     }
    // });
}


}
