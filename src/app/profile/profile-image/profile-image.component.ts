import { Component, OnInit, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, AsyncSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent extends AppComponentBase implements OnInit {


  subject = new AsyncSubject();

  file = null;
  filePath = 'Images/';
  fileRef = null;

  user: UserDto = new UserDto();

  saving = false;

  url = '';

  profileUrl: Observable<string | null>;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  items: Observable<any[]>;
  constructor(
    injector: Injector,
    private storage: AngularFireStorage,
    public _userService: UserServiceProxy,
    private _appSessionService: AppSessionService,


    ) {
    super(injector);


      this._userService.get(this._appSessionService.user.id).subscribe(result => {
        this.user = result;
      });


  }
  ngOnInit() {


    this._userService.get(this._appSessionService.user.id).subscribe(result => {
      this.user = result;
    });




  }

  uploadFile(event) {

    this.file = event.target.files[0];
    this.filePath = 'Images/';
    this.fileRef = this.storage.ref(this.filePath);


    const task = this.storage.upload(this.filePath, this.file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available

    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.fileRef.getDownloadURL();


        this.downloadURL.subscribe(u => {
          this.url = u;
        })

        })
     )
    .subscribe();



  }

  upload() {
    this.user.profilePicUrl = this.url;


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
    });



  }

}
