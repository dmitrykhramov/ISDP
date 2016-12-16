import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-sensor-detail',
    templateUrl: 'sensor-detail.html'
})
export class SensorDetailPage {

    sensor: any;

    constructor(public nav: NavController, public params: NavParams) {

        this.sensor = this.params.get('values');
    }

    ionViewDidLoad() {
        // console.log(this.sensor);
    }

}
