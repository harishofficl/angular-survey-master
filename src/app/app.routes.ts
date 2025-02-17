import { Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => AuthModule,
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
  },
];
