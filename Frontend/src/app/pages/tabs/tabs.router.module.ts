import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'doctor',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../doctor/doctor.module').then(m => m.DoctorPageModule)
          }
        ]
      },
      {
        path: 'doctorrating',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../doctorrating/doctorrating.module').then(m => m.DoctorratingPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'tabs',
        redirectTo: '/tabs/doctor',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/doctor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
