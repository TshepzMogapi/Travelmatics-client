import { Injectable } from "@angular/core";
import { Init } from "./init-contacts";
import { Observable, of } from "rxjs";

@Injectable()
export class LocalStorageService extends Init {
  constructor() {
    super();
    console.log("LocalStorageService Works");
    this.load();
  }

  getContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts"));

    return contacts;
  }

  addContact(newContact) {
    let nextIndex = this.getNextIdex();

    newContact.id = nextIndex;

    let contacts = JSON.parse(localStorage.getItem("contacts"));

    contacts.push(newContact);

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  deleteContact(contactId) {
    let contacts = JSON.parse(localStorage.getItem("contacts"));

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === contactId) {
        console.log("Delete");
        console.log(contacts);

        contacts.splice(i, 1);

        localStorage.setItem("contacts", JSON.stringify(contacts));
        // return;
      }
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  updateContact(newContact) {
    let contacts = JSON.parse(localStorage.getItem("contacts"));

    for (let i = 0; i < contacts.length; i++) {
      console.log(contacts[i]);

      if(contacts[i].id == newContact.id) {

        contacts[i] = newContact;

        localStorage.setItem("contacts", JSON.stringify(contacts));
      }
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  getNextIdex() {
    let tempCs = this.getContacts();

    let nextIndex: number;

    let arr = [];
    tempCs.map(tc => {
      arr.push(tc.id);
    });

    nextIndex = arr.sort((a, b) => a - b)[arr.length - 1];

    return nextIndex + 2;
  }
}
