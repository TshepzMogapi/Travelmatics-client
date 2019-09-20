import { Component, Injector, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatCheckboxChange, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CreateUserDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';
import { LocalStorageService } from '@app/local-storage.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  step = 0;

  localContact = {
    "contactId" : 0,
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

  saving = false;

  constructor(
    public _userService: UserServiceProxy,
    private _dialogRef: MatDialogRef<EditContactComponent>,

    private localStorageService: LocalStorageService,
    @Optional() @Inject(MAT_DIALOG_DATA) private contactInput: any
  ) {
  }

  ngOnInit() {
    // this.localContact.contactId = this.contactInput.id
  }

  save(): void {

    this.localStorageService.updateContact(this.contactInput);

  }

  close(result: any): void {
    this._dialogRef.close(result);
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
