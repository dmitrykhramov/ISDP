import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {BluetoothSerial} from "ionic-native";

@Component({
  selector: 'page-bluetooth-sensors-list',
  templateUrl: 'bluetooth-sensors-list.html'
})
export class BluetoothSensorsListPage {

  sensors: any = [];
  units: any = ['°C', '%', 'hPa', 'Hz'];
  icons: any = ['thermometer', 'water', 'speedometer', 'megaphone'];
  loader;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loadDataFromRpi();
  }

  loadDataFromRpi() {

    BluetoothSerial.isConnected().then(() => {

      BluetoothSerial.write("GET_DATA").then(() => {
        console.log("request_sent");
        this.sensors = [];

        BluetoothSerial.subscribe("}").subscribe((data) => {
          console.log(data);
          let jsonObj = JSON.parse(data);
          let keyes = Object.keys(jsonObj);
          for (let i = 0; i < keyes.length; i++) {
            this.sensors.push({
              name: keyes[i],
              value: jsonObj[keyes[i]]
            });
          }
        });
      });

    });
  }

  // presentLoading() {
  //   this.loader = this.loadingCtrl.create({
  //     content: "Please wait..."
  //   });
  //   this.loader.present();
  // }
  //
  // loadingDismiss() {
  //   this.loader.dismiss();
  // }

}
