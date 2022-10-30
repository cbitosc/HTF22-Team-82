import { GenerateQuizComponent } from './generate-quiz/generate-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { ScoreComponent } from './score/score.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router'
import { NewquizComponent } from './newquiz/newquiz.component';
import { ProfileComponent } from './profile/profile.component';
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'quiz/:qname/edit', component: EditQuizComponent },
    { path: 'quiz/:qname/:score', component: ScoreComponent },
    { path: 'quiz/:qname', component: QuizComponent },
    { path: 'addquiz', component: NewquizComponent },
    { path: 'generate', component: GenerateQuizComponent },
    { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
  
