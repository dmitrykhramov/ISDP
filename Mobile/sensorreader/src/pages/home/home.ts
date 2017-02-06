import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Data} from "../../providers/data";
import {SensorDetailPage} from "../sensor-detail/sensor-detail";
import {BluetoothScreenPage} from "../bluetooth-screen/bluetooth-screen";

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
                                timestamp: data[i].last_value.timestamp,
                                color: this.defineColor(data[i].name, data[i].last_value.value)
                            }
                        }

                        if (data[i+1]) {
                            this.sensors[rowNum][1] = {
                                name: data[i+1].name,
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



        });


    }

    ionViewDidLoad() {
        console.log(this.sensors);
        let tempStr = '{"name" : "CO2", "value" : "124"}';
        let jsonObj = JSON.parse(tempStr);
        console.log(jsonObj);

        // pythonDictionary = {'name':'Bob', 'age':44, 'isEmployed':True}
        // dictionaryToJson = json.dumps(pythonDictionary)
    }

    viewSensor(sensorUrl, timestampEnd) {

        this.nav.push(SensorDetailPage, {
            url: sensorUrl,
            end: timestampEnd
        });
    }

    openBTPage() {
        this.nav.push(BluetoothScreenPage);
    }

    defineColor(name, value) {
        if (name === "Humidity" && value > 0) {
            return "red";
        } else {
            return "green";
        }
    }

}
