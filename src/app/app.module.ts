import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import { ToastrModule } from 'ng6-toastr-notifications';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpModule } from '@angular/http';
// import { DataTablesModule } from 'node_modules/angular-datatables/dist/data-tables.module';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './services';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { NewquizComponent } from './newquiz/newquiz.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoreComponent } from './score/score.component';
import { OrderbyPipe } from './orderby.pipe';
import { SearchPipe } from './search.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { QuestionComponent } from './question/question.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchNamePipe } from './search-name.pipe';
import { SpeedDialFabComponent } from './speed-dial-fab/speed-dial-fab.component';
import { GenerateQuizComponent } from './generate-quiz/generate-quiz.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    QuizComponent,
    NewquizComponent,
    NotFoundComponent,
    ProfileComponent,
    ScoreComponent,
    OrderbyPipe,
    SearchPipe,
    CustomDatePipe,
    QuestionComponent,
    EditQuizComponent,
    AddQuestionComponent,
    NavigationComponent,
    SearchNamePipe,
    SpeedDialFabComponent,
    GenerateQuizComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSidenavModule,
    GoogleChartsModule,
    HttpModule,
    MatStepperModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [ AddQuestionComponent, ConfirmationDialogComponent ]
})
export class AppModule { }
