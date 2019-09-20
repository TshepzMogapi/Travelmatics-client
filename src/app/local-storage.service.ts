import { Injectable } from '@angular/core';
import { Init } from './init-contacts';

@Injectable()
export class LocalStorageService extends Init {

  constructor() {
    super();
    console.log('LocalStorageService Works');
    this.load();
   }

   getContacts() {
     let contacts = JSON.parse(localStorage.getItem('contacts'));
     return contacts;
   }

   addContact(newContact) {

    let tempCs = this.getContacts();

    // tempCs.

    let contactsLength = tempCs.length;

    // if(tempCs[]) {

    // }




      let contacts = JSON.parse(localStorage.getItem('contacts'));

      contacts.push(newContact);

      localStorage.setItem('contacts', JSON.stringify(contacts));
   }

   deleteContact(contactId) {
     let contacts = JSON.parse(localStorage.getItem('contacts'));

     for(let i = 0; i <contacts.length; i++) {

      if(contacts[i].text == contactId) {
        contacts.splice(i, 1);
      }
   }

      localStorage.setItem('contacts', JSON.stringify(contacts));
   }

     updateContact(newContact){

       let contacts = JSON.parse(localStorage.getItem('contacts'));

     for(let i = 0; i <contacts.length; i++) {

      console.log(contacts[i]);

      // if(contacts[i].id == newContact.id) {


      //   // contacts[i].id = newContactId;
      // }
   }
      localStorage.setItem('contacts', JSON.stringify(contacts));
   }




}
