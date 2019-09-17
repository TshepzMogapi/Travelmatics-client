import { Component, Injector, Optional, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatCheckboxChange
} from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  UserDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  saving = false;

  user: UserDto = new UserDto();

  step = 0;

  constructor(
    public _userService: UserServiceProxy,
    private _dialogRef: MatDialogRef<EditProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) { 
  }

  ngOnInit() {
    this._userService.get(this._id).subscribe(result => {
      this.user = result;
    });
  }

  save(): void {
  console.log(this.user);


    // this._userService.update()
    // this.saving = true;

    
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
