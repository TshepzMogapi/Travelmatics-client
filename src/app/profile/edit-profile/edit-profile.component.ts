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
import { UtilService } from '@app/util.service';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends AppComponentBase implements OnInit {

  isAppMobile= false;
  saving = false;

  user: UserDto = new UserDto();

  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};



  step = 0;

  constructor(
    injector: Injector,
    public utilService: UtilService,
    public _userService: UserServiceProxy,
    private _appSessionService: AppSessionService,
    private _dialogRef: MatDialogRef<EditProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);

  }

  ngOnInit() {

    this.isAppMobile = this.utilService.isDeviceMobile(window);


    this._userService.get(this._id).subscribe(result => {
      this.user = result;
    });

    // this._userService.getRoles().subscribe(result2 => {
    //   this.roles = result2.items;
    //   this.setInitialRolesStatus();
    // });
  }

  // setInitialRolesStatus(): void {
  //   _.map(this.roles, item => {
  //     this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
  //       item.normalizedName
  //     );
  //   });
  // }

  save(): void {

    this.saving = true;
    this._userService
      .update(this.user)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });


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
