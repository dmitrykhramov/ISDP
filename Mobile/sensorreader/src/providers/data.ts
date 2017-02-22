import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

  ubidotsToken: string = "i8byYFRK7RPIlsu0umgOMvPnw5b8k8";
  dataSourceId: string = "58094d9c76254272390c564b";
  urlForControl: string = "http://things.ubidots.com/api/v1.6/devices/control/controlvar/values?token=i8byYFRK7RPIlsu0umgOMvPnw5b8k8";

  constructor(public http: Http) {}

  getLastValues() {
    return this.http.get("http://things.ubidots.com/api/v1.6/datasources/" + this.dataSourceId + "/variables/?token=" + this.ubidotsToken)
        .map(res => res.json().results);
  }

  getSensorValues(sensorUrl, start, end) {
    sensorUrl += "?start=" + start + "&end=" + end + "&token=" + this.ubidotsToken;
    return this.http.get(sensorUrl).map(res => res.json().results);
  }

  getStatistics(id, start, end) {
    let url = "http://things.ubidots.com/api/v1.6/variables/" + id + "/statistics/mean,min,max/" + start + "/" + end + "/?token=" + this.ubidotsToken;
    return this.http.get(url).map(res => res.json());
  }

  controlSystem(val) {

    let data = new URLSearchParams();
    data.append('value', val);

    this.http
        .post(this.urlForControl, data)
        .subscribe(data => {
          console.log('ok');
        }, error => {
          console.log(error.json());
        });
  }

}
