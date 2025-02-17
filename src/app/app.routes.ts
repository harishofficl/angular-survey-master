import { Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => AuthModule,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];
