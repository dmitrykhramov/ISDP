import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Data} from "../../providers/data";
import {SensorDetailPage} from "../sensor-detail/sensor-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    sensors: any = [];

    constructor(public nav: NavController, public dataService: Data, public platform: Platform) {}

    ionViewDidLoad(){

        this.platform.ready().then(() => {
            this.sensors = this.dataService.getLastValues();
            console.log(this.sensors);
        });
    }

    viewSensor(sensorUrl, timestampEnd) {

        var date = new Date(timestampEnd);
        date.setDate(date.getDate() - 1);
        let timestampStart = date.getTime();

        let values = this.dataService.getSensorValues(sensorUrl, timestampStart, timestampEnd);
        this.nav.push(SensorDetailPage, {
            values: values
        });
    }

}
