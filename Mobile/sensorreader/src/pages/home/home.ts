import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CloudSensorsIndexPage} from "../cloud-sensors-index/cloud-sensors-index";
import {ControlPage} from "../control/control";
import {BluetoothDevicesListPage} from "../bluetooth-devices-list/bluetooth-devices-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  pushPage(){
    this.navCtrl.push(CloudSensorsIndexPage);
  }

  pushControl(){
    this.navCtrl.push(ControlPage);
  }

  pushBluetooth(){
    this.navCtrl.push(BluetoothDevicesListPage);
  }

}
