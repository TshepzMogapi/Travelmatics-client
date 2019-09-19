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

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent extends AppComponentBase implements OnInit {

  saving = false;

  contact: ContactDto = new ContactDto();


  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    public contactService: ContactServiceProxy,
    private _dialogRef: MatDialogRef<CreateContactComponent>
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  save(): void {

    console.log(this.contact);
    // this.saving = true;

    this.contactService.createContact(this.contact)
    .pipe(
      finalize(() => {
        this.saving = false;
      })
    )
    .subscribe(() => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.close(true);
    });;


  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
