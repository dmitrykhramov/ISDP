import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Data} from "../../providers/data";

declare var FusionCharts;

@Component({
  selector: 'page-cloud-sensors-graph',
  templateUrl: 'cloud-sensors-graph.html'
})
export class CloudSensorsGraphPage {

  url: any;
  id: any;
  start: any;
  end: any;
  name: any;
  labelStep: number;
  graphCaption: any;
  xAxisName: any;
  loader: any;
  mean:any;
  min:any;
  max:any;

  constructor(public nav: NavController, public params: NavParams, public dataService: Data, public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.url = this.params.get('url');
    this.id = this.params.get('id');
    this.end = this.params.get('end');
    this.name = this.params.get('name');
    this.getDataForGraph(24);
  }


  drawTheChart(values: any) {

    let step = this.labelStep;
    let xName = this.xAxisName;
    let sensorName = this.name;
    let caption = this.graphCaption;

    FusionCharts.ready(function() {
      var sensorChart = new FusionCharts({
        type: 'line',
        renderAt: 'chart-container',
        width: '100%',
        height: '70%',
        dataFormat: 'json',
        dataSource: {
          "chart": {
            //Canvas is smaller than background
            "caption": caption,
            "xAxisName": xName,
            "yAxisName": sensorName,
            "paletteColors": "#387ef5",
            //Outer part
            "bgColor": "#fffff",
            "bgAlpha": "0",
            "baseFontColor": "#387ef5",
            "showBorder": "0",
            "showCanvasBorder": "0",
            //Inner part
            "canvasBgColor": "#ffffff",
            "canvasBgAlpha": "0",
            "plotBorderAlpha": "10",
            //"plotFillAlpha": "30",
            //Setting gradient fill to true
            //"usePlotGradientColor": "1",
            //Setting the gradient formation color
            //"plotGradientColor": "#1aaf5d",
            "showXAxisLine": "1",
            "axisLineAlpha": "25",
            "divLineAlpha": "10",
            "showValues": "1",
            "showAlternateHGridColor": "0",
            "captionFontSize": "16",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5",
            "labelStep": step
          },

          "data": values
        }
      }).render();
    });

    this.loadingDismiss();

  }

  createLabelValueArray(values: any, time: number) {

    let length = values.length;
    this.labelStep = Math.floor(length / time);

    let dataArray = [];
    let tempLabel;

    for(let i = length - 1; i >= 0; i-- ) {
      if (time === 24) {
        tempLabel = new Date(values[i].timestamp).getHours().toString();
      } else {
        tempLabel = new Date(values[i].timestamp).getDate().toString();
      }
      dataArray.push({
        "label": tempLabel,
        "value": values[i].value
      });
    }

    return dataArray;
  }

  getDataForGraph(time: number) {

    let date = new Date(this.end);

    if (time === 24) {
      date.setDate(date.getDate() - 1);
      this.xAxisName = 'Hours';
      this.graphCaption = 'Last day'
    } else if (time === 7) {
      date.setDate(date.getDate() - 8);
      this.xAxisName = 'Days';
      this.graphCaption = 'Last week'
    } else if (time === 30) {
      date.setDate(date.getDate() - 31);
      this.xAxisName = 'Days';
      this.graphCaption = 'Last month';
    }

    this.start = date.getTime();

    this.dataService.getSensorValues(this.url, this.start, this.end).subscribe(data => {

      let graphData = this.createLabelValueArray(data, time);
      this.drawTheChart(graphData);

    }, (err) => {
      console.log(err);
    });

    this.dataService.getStatistics(this.id, this.start, this.end).subscribe(data => {
      this.mean = data.mean;
      this.max = data.max;
      this.min = data.min;
    });

  }

  backToRoot(){
    this.nav.popToRoot();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  loadingDismiss() {
    this.loader.dismiss();
  }

}
