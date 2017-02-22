import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-intro-slides',
  templateUrl: 'intro-slides.html'
})
export class IntroSlidesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  pushPage(){
    this.navCtrl.push(HomePage);
  }

  makeRoot(){
    this.navCtrl.setRoot(HomePage);
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      message: '<h4>IT Team</h4><p>Polina Timofeeva</p> <p>Dmitry Khramov</p> <p>Kai Kukasch</p><br>' +
      '<h4>Electronics Team</h4><p>Shazam Kasher</p><p>Huynh Vo</p><p>Thales Mendes</p><p>Le Thanh Thi</p><br>' +
      '<h4>Secretary</h4> <p>Andra Corcachi</p><br>' +
      '<h4>Teachers</h4><p>Antti Piironen</p><p>Matti Fischer</p>',
      buttons: ['OK']
    });
    alert.present();
  }

}
