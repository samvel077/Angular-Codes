import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
   { path: '', component: ComponentOneComponent, pathMatch: 'full', data: { id: '1', name: "Angular" } },
   { path: 'com2', component: ComponentTwoComponent, data: { id: '2', name: "Angular" } },
];

@NgModule({
   declarations: [
      AppComponent,
      ComponentOneComponent,
      ComponentTwoComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}

