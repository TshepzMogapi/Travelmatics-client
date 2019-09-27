import { Component, Injector, Optional, Inject, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends AppComponentBase implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());



  isAppMobile= false;
  saving = false;

  user: UserDto = new UserDto();

  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};

  genders = ['Male', 'Female', 'Non Binary'];

  userPersonalData = {
    idNumber: null,
    profilePicUrl: null,
    age: null,
    passPortNumber: null,
    gender: null,
    mobileNumber: null,
    dob: {
      dayOfBirth:null,
      monthOfBirth: null,
      yearOfBirth: null,
      fullDate: null,

    }


  }



  step = 0;

  constructor(
    injector: Injector,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
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

    // this.mapDataToDto();

    console.log(this.user.passportNumber);

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

  getMoreInfo() {



    this.userPersonalData.dob.dayOfBirth = this.userPersonalData.idNumber.toString().substring(4,6);
    this.userPersonalData.dob.monthOfBirth = this.userPersonalData.idNumber.toString().substring(2,4);
    this.userPersonalData.dob.yearOfBirth = this.userPersonalData.idNumber.toString().substring(0,2);

    this.userPersonalData.dob.fullDate = new Date(
      this.userPersonalData.dob.yearOfBirth,
      parseInt(this.userPersonalData.idNumber.toString().substring(2,4)) - 1,
      this.userPersonalData.dob.dayOfBirth);

      this.date = new FormControl(this.userPersonalData.dob.fullDate);

      console.log(this.userPersonalData.dob.fullDate);

    this.userPersonalData.gender = this.getGender(this.userPersonalData.idNumber.toString().substring(6,10))

    console.log(this.user);

  }

  getGender(code){

    let tempGender = '';

    if(parseInt(code) <= 4999) {

      tempGender = this.genders[1];

    } else {

      tempGender = this.genders[0];

    }
    return tempGender;

  }

  doNothing() {

  }

  mapDataToDto() {
    this.user.idNumber = this.userPersonalData.idNumber;
    this.user.profilePicUrl = this.userPersonalData.profilePicUrl;
    this.user.age = this.userPersonalData.age;
    this.user.passportNumber = this.userPersonalData.passPortNumber;

    // this.user.gender = this.userPersonalData.gender;

    // this.user.


    // userPersonalData = {
    //   idNumber: null,
    //   profilePicUrl: null,
    //   age: null,
    //   passPortNumber: null,
    //   gender: null,
    //   mobileNumber: null,
    //   dob: {
    //     dayOfBirth:null,
    //     monthOfBirth: null,
    //     yearOfBirth: null,
    //     fullDate: null,

    //   }
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
