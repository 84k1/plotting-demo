import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/pages/wrapper/wrapper.component').then(
        (c) => c.WrapperComponent
      ),
    title: 'Plotting',
    children: [
      {
        path: '',
        redirectTo: 'plotting',
        pathMatch: 'full',
      },
      {
        path: 'plotting',
        loadComponent: () =>
          import('./features/plotting/pages/plotting/plotting.component').then(
            (c) => c.PlottingComponent
          ),
      },
    ],
  },
];
