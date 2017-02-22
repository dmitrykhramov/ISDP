import { Component } from '@angular/core';
import {Data} from "../../providers/data";
import {Http} from "@angular/http";

@Component({
  selector: 'page-control',
  templateUrl: 'control.html'
})
export class ControlPage {

  isOn: boolean = false;

  constructor(public http: Http, public dataService: Data) {}

  control() {
    if (this.isOn) {
      this.dataService.controlSystem("0.0");
      this.isOn = false;

    } else {
      this.dataService.controlSystem("1.0");
      this.isOn = true;
    }
  }

}
