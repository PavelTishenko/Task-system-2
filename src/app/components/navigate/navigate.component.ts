import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthProvider } from "ngx-auth-firebaseui";

@Component({
  selector: "app-navigate",
  templateUrl: "./navigate.component.html",
  styleUrls: ["./navigate.component.scss"]
})
export class NavigateComponent {
  providers = AuthProvider;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}

  afterSignIn(event: any) {
    console.log(`You are sign in as ${event}`);
    const element = document.getElementById("auth");
    element.classList.add("visible");
    const btnOfEmployees = document.querySelector("#btn-employees");
    btnOfEmployees.classList.remove("visible");
    const btnStat = document.querySelector("#btn-stat");
    btnStat.classList.remove("visible");
    const btnParser = document.querySelector('#btn-stat-parser');
    btnParser.classList.remove("visible");
  }

  show() {
    const listEmployees = document.getElementById("employees");
    listEmployees.classList.toggle("visible");
  }
}
