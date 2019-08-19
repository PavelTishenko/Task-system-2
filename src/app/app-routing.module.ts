import { StatisticsComponent } from "./components/statistics/statistics.component";
import { NavigateComponent } from "./components/navigate/navigate.component";
import { EmployeeOneComponent } from "./components/employee-one/employee-one.component";
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
