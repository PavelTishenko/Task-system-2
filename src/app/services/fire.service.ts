import { AngularFireAuthModule } from '@angular/fire/auth';
import { User } from './../user';
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Datas } from "../Datas";
import { ParserFile } from "../parser-file";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FireService {
  courses: Observable<any[]>;
  users: Observable<any[]>;
  collection: AngularFirestoreCollection<Datas>;
  userCollection: AngularFirestoreCollection<User>;
  parserCollection: AngularFirestoreCollection<ParserFile>;
  constructor(
    private db: AngularFirestore,
    ) {
    this.collection = db.collection("demo-courses");
    this.userCollection = db.collection("users");
    this.parserCollection = db.collection("excel");
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

  addFile(data: any) {
      this.db.collection('excel').add(data);
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
