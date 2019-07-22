import { AngularFireAuthModule } from '@angular/fire/auth';
import { User } from './../user';
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Datas } from "../Datas";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FireService {
  courses: Observable<any[]>;
  users: Observable<any[]>
  collection: AngularFirestoreCollection<Datas>;
  userCollection: AngularFirestoreCollection<User>
  constructor(
    private db: AngularFirestore,
    ) {
    this.collection = db.collection("demo-courses");
    this.userCollection = db.collection("users");
  }

  getData() {
    this.courses = this.collection.snapshotChanges().pipe(
      map(collection => {
        return collection.map(document => {
          const data = document.payload.doc.data() as Datas;
          data.id = document.payload.doc.id;
          return data;
        });
      })
    );
    return this.courses;
  }

  addDatas(data: Object) {
    this.db.collection("demo-courses").add(data);
  }

  getUsersData(){
    this.users = this.userCollection.snapshotChanges().pipe(
      map(collection => {
        return collection.map(document => {
          const userData = document.payload.doc.data() as User;
          userData.uid = document.payload.doc.id;
          return userData;
        });
      })
    );
    return this.users;
  };
}
