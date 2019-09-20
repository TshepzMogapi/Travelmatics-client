import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  ContactServiceProxy,
  ContactDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';
import { UtilService } from '@app/util.service';
import { AppSessionService } from '@shared/session/app-session.service';
import { LocalStorageService } from '@app/local-storage.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent extends AppComponentBase implements OnInit {

  saving = false;

  isAppMobile = false;

  step = 0;

  contact: ContactDto = new ContactDto();

  localContact = null;

  appSession: AppSessionService;

  constructor(
    injector: Injector,

    private localStorageService: LocalStorageService,
    public _userService: UserServiceProxy,
    private appSessionService: AppSessionService,
    public utilService: UtilService,
    public contactService: ContactServiceProxy,
    private _dialogRef: MatDialogRef<CreateContactComponent>
  ) {
    super(injector);
  }

  ngOnInit() {

    this.appSession = this.appSessionService;

    this.localContact = {
      "ownerId" : 0,
      "firstName" : "",
      "lastName" : "",
      "emailAddress" : "",
      "contactType" : "",
      "contactDetails": [
          {
              "emailAddress" : "",
              "phoneNumber" : "",
              "websiteUrl" : ""
          }

      ]

  };

    this.isAppMobile = this.utilService.isDeviceMobile(window);
  }

  save(): void {

    // console.log( this.appSession);

    this.localContact.ownerId = this.appSession.user.id;

    this.localStorageService.addContact(this.localContact);

    this.close({

    });

    // this.localStorageService.




  }

  close(result: any): void {
    this._dialogRef.close(result);
    this.localStorageService.getContacts();
  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
