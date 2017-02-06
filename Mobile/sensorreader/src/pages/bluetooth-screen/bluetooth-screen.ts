import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';

@Component({
  selector: 'page-bluetooth-screen',
  templateUrl: 'bluetooth-screen.html'
})
export class BluetoothScreenPage {

  public working: string;
  public devices = [];

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.getAllBluetoothDevices();
    });

  }


  getAllBluetoothDevices(){

    BluetoothSerial.isEnabled().then((data)=> {

      BluetoothSerial.list().then((allDevices) => {
        this.devices = allDevices;
        console.log(this.devices);
      });

    });
  }

  connectDevice(id) {

      BluetoothSerial.connect(id).subscribe(() => {
          console.log("Connect success");

          BluetoothSerial.isConnected().then(() => {

              BluetoothSerial.write("hello world").then(() => {
                  console.log("sent");
                  });

              BluetoothSerial.subscribe("}").subscribe((data) => {
                  console.log(data);
                  let temp = JSON.parse(data);
                  console.log(temp);
              });

          });

      }, () => {
          console.log("Connect fail");
      });

  }

}
