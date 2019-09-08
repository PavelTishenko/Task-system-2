import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AngularDraggableModule } from "angular2-draggable";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigateComponent } from "./components/navigate/navigate.component";
import { LayoutModule } from "@angular/cdk/layout";
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { EmployeeOneComponent } from "./components/employee-one/employee-one.component";
import { FormsModule } from "@angular/forms";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { ChartsModule } from "ng2-charts";
import { FileParserComponent } from './components/file-parser/file-parser.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileSizePipe } from './file-size.pipe';
import { AngularFireStorageModule } from "@angular/fire/storage";
import {MatExpansionModule} from '@angular/material/expansion';

// import { LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavigateComponent,
    EmployeeOneComponent,
    StatisticsComponent,
    FileParserComponent,
    DropZoneDirective,
    FileUploaderComponent,
    FileSizePipe
  ],
  imports: [
    ChartsModule,
    FormsModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFirestoreModule,
    AngularDraggableModule,
    AngularFireStorageModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
