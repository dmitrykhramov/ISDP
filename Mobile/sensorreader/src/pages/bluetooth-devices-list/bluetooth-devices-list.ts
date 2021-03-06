import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {BluetoothSerial} from "ionic-native";
import {BluetoothSensorsListPage} from "../bluetooth-sensors-list/bluetooth-sensors-list";


@Component({
  selector: 'page-bluetooth-devices-list',
  templateUrl: 'bluetooth-devices-list.html'
})
export class BluetoothDevicesListPage {

  falseConnect: boolean = false;
  devices = [];

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.getAllBluetoothDevices();
    });

  }

  // Lists all avaliable devices for Bluetooth connection
  getAllBluetoothDevices(){

    BluetoothSerial.isEnabled().then(()=> {

      BluetoothSerial.list().then((allDevices) => {
        this.devices = allDevices;
      });

    });
  }

  // Connects to the choosen device and redirects to the list of sensors page
  connectDevice(id) {

    BluetoothSerial.connect(id).subscribe(() => {
      console.log("connect_success");

      this.navCtrl.push(BluetoothSensorsListPage);

    }, () => {
      console.log("connect_fail");
      this.falseConnect = true;
    });

  }

}
