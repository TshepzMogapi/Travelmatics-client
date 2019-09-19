import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
    templateUrl: './sidebar-user-area.component.html',
    selector: 'sidebar-user-area',
    encapsulation: ViewEncapsulation.None
})
export class SideBarUserAreaComponent extends AppComponentBase implements OnInit {

    shownLoginName = '';
    userName = '';

    bgColor = '';

    constructor(
        injector: Injector,
        private _authService: AppAuthService
    ) {
        super(injector);
    }

    ngOnInit() {



        this.bgColor = this.setting.get('App.UiTheme');
        this.userName = this.appSession.user.userName;
    }

    logout(): void {
        this._authService.logout();
    }
}
