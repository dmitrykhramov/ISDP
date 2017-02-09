import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-intro-slides',
  templateUrl: 'intro-slides.html'
})
export class IntroSlidesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  slides = [
    {
      title: "Welcome to MakesSense!",
      description: "The <b>MakesSense App</b> enables users to easily inspect different aspects of indoor air quality.",
      image: "../../assets/img/sensor.png",
    },
    {
      title: "Who get credits?",
      description: "<b>MakesSense App</b> is a part of International Sensor Development Project which is the result" +
      "of cooperation between Helsinki Metropolia AMK and Osnabrück Hochschule." +
      "<p>IT team:</p><p>Dmitry Khramov<br>Timofeeva Polina<br> Kai Kukasch</p>",
      image: "../../assets/img/hand.png",
    }
  ];

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(HomePage);
  }

}
