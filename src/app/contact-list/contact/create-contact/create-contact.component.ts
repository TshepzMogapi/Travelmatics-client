import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CreateUserDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent extends AppComponentBase implements OnInit {

  saving = false;

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    private _dialogRef: MatDialogRef<CreateContactComponent>
  ) { 
    super(injector);
  }

  ngOnInit() {
  }

  save(): void {
    // this.saving = true;

    
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
