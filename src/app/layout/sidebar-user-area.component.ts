import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './sidebar-user-area.component.html',
    selector: 'sidebar-user-area',
    encapsulation: ViewEncapsulation.None
})
export class SideBarUserAreaComponent extends AppComponentBase implements OnInit {

    shownLoginName = '';
    userName = '';

    bgColor = '';

  user: UserDto = new UserDto();


    constructor(
        injector: Injector,
        private _authService: AppAuthService,
        public _userService: UserServiceProxy,

    ) {
        super(injector);
    }

    ngOnInit() {





        this.bgColor = this.setting.get('App.UiTheme');
        this.userName = this.appSession.user.userName;

        this._userService.get(this.appSession.user.id).subscribe(result => {
            this.user = result;
          });
    }

    logout(): void {
        this._authService.logout();
    }
}
