import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CloudSensorsIndexPage} from "../cloud-sensors-index/cloud-sensors-index";
import {ControlPage} from "../control/control";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(CloudSensorsIndexPage);
  }

  pushControl(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(ControlPage);
  }

}
