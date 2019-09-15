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
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  saving = false;

  constructor(
    public _userService: UserServiceProxy,
    private _dialogRef: MatDialogRef<EditContactComponent>
  ) { 
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
