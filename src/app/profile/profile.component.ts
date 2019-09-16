import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }

  editProfile() {

    this.manageProfile();
    
  }


  private manageProfile(id?: number): void {

    let editProfileDialog;
    if (id === undefined || id <= 0) {
      editProfileDialog = this._dialog.open(EditProfileComponent);
    } 
    
  

}

}
