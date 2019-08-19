import { StatisticsComponent } from "./statistics/statistics.component";
import { NavigateComponent } from "./navigate/navigate.component";
import { EmployeeOneComponent } from "./employee-one/employee-one.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "employee/:name", component: EmployeeOneComponent },
  { path: "statistics", component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
