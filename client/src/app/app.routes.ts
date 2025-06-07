import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavComponent } from './components/nav/nav.component';

export const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [{ path: '', component: HomePageComponent, title: 'Lixo no 🗑️' }],
  },
];
