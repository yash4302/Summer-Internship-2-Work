import { APP_BOOTSTRAP_LISTENER, Directive, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { DirectivesComponent } from './directives/directives.component';
import { FormComponent } from './form/form.component';
import { ParentComponent } from './parent/parent.component';
import { WeatherComponent } from './weather/weather.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {path: '', redirectTo: '/work', pathMatch: 'full' },
  {path: 'work', component: WorkComponent },
  {path: 'binding', component: BindingComponent},
  {path: 'directives', component: DirectivesComponent },
  {path: 'communication', component: ParentComponent },
  {path: 'form', component: FormComponent },
  {path: 'weather', component: WeatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
