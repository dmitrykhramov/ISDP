import { Component } from '@angular/core';
import {NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import {Data} from "../../providers/data";
import {CloudSensorsGraphPage} from "../cloud-sensors-graph/cloud-sensors-graph";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-cloud-sensors-index',
  templateUrl: 'cloud-sensors-index.html'
})
export class CloudSensorsIndexPage {

  sensors: any = [];
  units: any = [['ppm', 'ppm'], ['ppm', 'ppm'], ['ppm', '°C'], ['%', 'hPa'], ['dB']];
  gradient: any;
  icons: any = [['cloudy', 'analytics'], ['flame', 'cloud-outline'], ['cloud', 'thermometer'], ['water', 'speedometer'],['megaphone']];
  loader: any;


  constructor(public nav: NavController, public dataService: Data, public platform: Platform, sanitizer: DomSanitizer, public loadingCtrl: LoadingController) {

    this.gradient = sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, #ffd200, #f7971e 100%)");

    this.platform.ready().then(() => {
      this.loadData();
    });
  }

  // Loads data and put it into the array sensors
  loadData() {

    this.sensors = [];

    this.presentLoading();

    this.dataService.getLastValues().subscribe(data => {

      let rowNum = 0;

      for (let i = 0; i < data.length; i+=2) {
        this.sensors[rowNum] = Array(2);

        if (data[i]) {

          this.sensors[rowNum][0] = {
            name: data[i].name,
            id: data[i].id,
            value: data[i].last_value.value,
            url: data[i].values_url,
            timestamp: data[i].last_value.timestamp,
            color: this.defineColor(data[i].name, data[i].last_value.value)
          }
        }

        if (data[i+1]) {
          this.sensors[rowNum][1] = {
            name: data[i+1].name,
            id: data[i+1].id,
            value: data[i+1].last_value.value,
            url: data[i+1].values_url,
            timestamp: data[i+1].last_value.timestamp,
            color: this.defineColor(data[i+1].name, data[i+1].last_value.value)
          }
        }

        rowNum++;
      }

    }, (err) => {
      console.log(err);
    });


    this.loadingDismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  loadingDismiss() {
    this.loader.dismiss();
  }

  // Redirects to the page with the graphic for the sensor
  viewSensor(sensorUrl, timestampEnd, sensorName, id) {

    this.nav.push(CloudSensorsGraphPage, {
      url: sensorUrl,
      end: timestampEnd,
      name: sensorName,
      id: id
    });
  }

  defineColor(name, value) {
    if ((value)%2 ==0) {
      return "red";
    } else {
      return "#387ef5";
    }
  }

  backToRoot(){
    this.nav.popToRoot();
  }

  doRefresh(refresher) {
    this.loadData();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  roundValue(value) {
    return Math.round(value);
  }

}
