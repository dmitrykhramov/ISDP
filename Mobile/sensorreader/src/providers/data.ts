import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

    ubidotsToken: string = "i8byYFRK7RPIlsu0umgOMvPnw5b8k8";
    dataSourceId: string = "58094d9c76254272390c564b";

    lastValues: any = [];

    constructor(public http: Http) {}

    getLastValues() {
        this.http.get("http://things.ubidots.com/api/v1.6/datasources/" + this.dataSourceId + "/variables/?token=" + this.ubidotsToken)
            .map(res => res.json().results).subscribe(data => {

            let rowNum = 0;

            for (let i = 0; i < data.length; i+=2) {
                this.lastValues[rowNum] = Array(2);

                if (data[i]) {

                    this.lastValues[rowNum][0] = {
                        name: data[i].name,
                        value: data[i].last_value.value,
                        url: data[i].values_url,
                        timestamp: data[i].last_value.timestamp
                    }
                }

                if (data[i+1]) {
                    this.lastValues[rowNum][1] = {
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

        return this.lastValues;
    }

    getSensorValues(sensorUrl, start, end) {

        let sensorValues: any = [];

        sensorUrl += "?start=" + start + "&end=" + end + "&token=" + this.ubidotsToken;

        this.http.get(sensorUrl).map(res => res.json().results).subscribe(data => {

            for(let i = 0; i < data.length; i++) {

                sensorValues.push({
                    value: data[i].value,
                    date: new Date(data[i].timestamp)
                });
            }

        }, (err) => {
            console.log(err);
        });

        console.log(sensorValues);

        return sensorValues;
    }

}
