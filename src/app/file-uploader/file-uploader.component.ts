import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireUploadTask } from 'angularfire2/storage'
import { log } from "util";
import { switchMap, filter, last, concatMap } from "rxjs/operators";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  panelOpenState = false;
  //main task
  task: AngularFireUploadTask;
  //progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  //download URL
  downloadURL: Observable<string>;
  //state for dropzone css toggling
  isHovering: boolean;
  image: string;
  downloadURL$: Observable<string>;
  constructor(private storage: AngularFireStorage) { }
  ngOnInit() {
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  //  Firebase any file upload
  fileUpload($event) {
    // Took file
    const file: File = $event.target.files[0];
    // Add path of file in firebase
    const filePath = `test/${file.name}`;

    // Upload
    const task = this.storage.upload(filePath, file);
    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      );
     this.downloadURL$.subscribe(console.log)
  }
  // this one below we can delete
  startUpload(event: FileList) {
    //  the file object
    const file = event.item(0);
    //  client side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }
    //   the storage path
    const path = `test/${new Date().getTime()}_${file.name}`;
    //  optional metadata
    const customMetadata = { app: 'My AngularFire !' };

    //  the main task
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file, { customMetadata });

    //  progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    //  the file's download URL

    this.downloadURL = this.task.snapshotChanges().pipe(
      // filter(snap => snap.state === this.storage.TaskState.SUCCESS),
      switchMap(() => ref.getDownloadURL())
    )
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
