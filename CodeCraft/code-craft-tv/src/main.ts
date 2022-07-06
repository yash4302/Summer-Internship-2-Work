// import { enableProdMode } from '@angular/core';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

/**
 * 01. Writing our first Angular App
 */

@Component({
  selector: 'joke-1',
  template: `
      <h1>01. Writing our First App</h1>
      <p>Halloumi (Hello Me)</p>
    `
})
class JokeComponent {
}
  
  /**
 * 02. String Interpolation
 */

 @Component({
  selector: 'joke-2',
  template: `
    <h1>{{setup}}</h1>
    <p>{{punchline}}</p>
  `
})
class Joke2Component {
  setup: string;
  punchline: string;

  constructor() {
    this.setup = "02. String Interpolation";
    this.punchline = "Halloumi (Hello Me)";
  }
}

/**
 * Common for All
 */
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    JokeComponent,
    Joke2Component,
  ],
  bootstrap: [
    JokeComponent,
    Joke2Component,
  ]
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
