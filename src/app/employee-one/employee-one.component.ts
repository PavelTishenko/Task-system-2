import { User } from "./../user";
import { Component, OnInit } from "@angular/core";
import { FireService } from "../services/fire.service";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Datas } from "../Datas";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-employee-one",
  templateUrl: "./employee-one.component.html",
  styleUrls: ["./employee-one.component.scss"]
})
export class EmployeeOneComponent implements OnInit {
  dataArr: Observable<any[]>;
  usersData: any;
  courses: Observable<any[]>;
  dataTo: Datas = {
    name: null,
    position: null,
    tz: null,
    date: null,
    id: null
  };
  triger: boolean = false;
  collection: AngularFirestoreCollection<Datas>;
  named: string;
  constructor(
    private route: ActivatedRoute,
    private db: FireService,
    private firestore: AngularFirestore
  ) {
    this.courses = db.getData();
    this.collection = this.firestore.collection("demo-courses");
    this.dataArr = this.db.getData();
    this.usersData = this.db.getUsersData().subscribe(e => console.log(e));//all registetred users
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.name === "Kirill") {
        this.named = "Кирилл";
      } else if (params.name === "Pavel") {
        this.named = "Павел";
      } else if (params.name === "Evgeniy") {
        this.named = "Евгений";
      } else if (params.name === "Timyr") {
        this.named = "Тимур";
      }
    });
  }

  addData() {
    const dateNow = Date.now();
    this.dataTo.date = dateNow;
    const myData = Object.assign({}, this.dataTo);
    this.db.addDatas(myData);
  }

  delete(id: string) {
    this.triger = !this.triger;
    this.firestore.doc("demo-courses/" + id).delete();
  }
}
