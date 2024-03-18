import { Routes } from '@angular/router';
import { MatchesComponent } from './components/matches/matches.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
export const routes: Routes = [
    { path: 'login', 'title':'Login', component: LoginPageComponent },
    { path: 'matches','title':'Matches', component: MatchesComponent },


	// Add more routes if needed
];