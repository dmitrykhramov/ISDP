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

    constructor(public nav: NavController, public dataService: Data, public platform: Platform) {
        this.platform.ready().then(() => {
            this.dataService.getLastValues().subscribe(data => {

                let rowNum = 0;

                    for (let i = 0; i < data.length; i+=2) {
                        this.sensors[rowNum] = Array(2);

                        if (data[i]) {

                            this.sensors[rowNum][0] = {
                                name: data[i].name,
                                value: data[i].last_value.value,
                                url: data[i].values_url,
                                timestamp: data[i].last_value.timestamp
                            }
                        }

                        if (data[i+1]) {
                            this.sensors[rowNum][1] = {
                                name: data[i+1].name,
                                value: data[i+1].last_value.value,
                                url: data[i+1].values_url,
                                timestamp: data[i+1].last_value.timestamp
                            }
                        }

                        rowNum++;
                    }

                }, (err) => {
                    console.log(err);
            });

        });
    }

    viewSensor(sensorUrl, timestampEnd) {

        var date = new Date(timestampEnd);
        date.setDate(date.getDate() - 1);
        let timestampStart = date.getTime();
        this.nav.push(SensorDetailPage, {
            url: sensorUrl,
            start: timestampStart,
            end: timestampEnd
        });
    }

}
