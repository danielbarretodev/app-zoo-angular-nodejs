import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


// Componentes
import {HomeComponent} from './components/home/home.component';
import {ListAnimalsComponent} from './components/list-animals/list-animals.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list-animals', component: ListAnimalsComponent},
  {path: 'mis-datos', component: UserEditComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
