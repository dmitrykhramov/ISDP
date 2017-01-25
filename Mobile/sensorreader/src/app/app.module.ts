import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SensorDetailPage} from "../pages/sensor-detail/sensor-detail";
import {Data} from "../providers/data";
import {BluetoothScreenPage} from "../pages/bluetooth-screen/bluetooth-screen";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SensorDetailPage,
    BluetoothScreenPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SensorDetailPage,
    BluetoothScreenPage
  ],
  providers: [Data]
})
export class AppModule {}
