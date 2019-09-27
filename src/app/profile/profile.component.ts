import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";

import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { UserServiceProxy, UserDto } from "@shared/service-proxies/service-proxies";
import { AppSessionService } from "@shared/session/app-session.service";
import { UtilService } from "@app/util.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  user: UserDto = new UserDto();
  appSession: AppSessionService;

  isAppMobile = false;

  constructor(
    public utilService: UtilService,
    private _dialog: MatDialog,
    public _userService: UserServiceProxy,
    private _appSessionService: AppSessionService
  ) {}

  ngOnInit() {
    this.isAppMobile = this.utilService.isDeviceMobile(window);
    this.appSession = this._appSessionService;

    this._userService.get(this.appSession.user.id).subscribe(result => {
      this.user = result;
    });
  }

  editProfile() {
    // this._appSessionService.user

    this.manageProfile(this.appSession.user.id);
  }

  private manageProfile(id: number): void {
    this._dialog.open(EditProfileComponent, { data: id });

    //     let editProfileDialog = this._dialog.open(EditProfileComponent, {data: id});

    //   editProfileDialog.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.refresh();
    //     }
    // });
  }

}
