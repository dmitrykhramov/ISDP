import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SensorDetailPage} from "../pages/sensor-detail/sensor-detail";
import {Data} from "../providers/data";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SensorDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SensorDetailPage
  ],
  providers: [Data]
})
export class AppModule {}
