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
    // BluetoothSerial.connect("0C:E7:25:99:49:F6").subscribe((data) => {
    //   console.log(data);
    // })
      BluetoothSerial.isConnected().then(() => {
          console.log("connected");
      }, () => {
          console.log("disconnected");
      });



      BluetoothSerial.connect(id).subscribe(() => {
          console.log("success");
      }, () => {
          console.log("fail");
      });



    // BluetoothSerial.isConnected().then((res) => {
    //   console.log("Device is already connected");
    //   console.log(res);
    // });

  }

}
