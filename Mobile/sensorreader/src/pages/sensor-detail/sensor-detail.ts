import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Data} from "../../providers/data";

declare var FusionCharts;

@Component({
    selector: 'page-sensor-detail',
    templateUrl: 'sensor-detail.html'
})

export class SensorDetailPage {

    url: any;
    start: any;
    end: any;

    constructor(public nav: NavController, public params: NavParams, public dataService: Data) {

        this.url = this.params.get('url');
        this.start = this.params.get('start');
        this.end = this.params.get('end');

        this.dataService.getSensorValues(this.url, this.start, this.end).subscribe(data => {

            let graphData = this.createArrayOfLabelValues(data);
            console.log(graphData);
            this.drawTheChart(graphData);

        }, (err) => {
            console.log(err);
        });
    }


    drawTheChart(values: any) {

        FusionCharts.ready(function() {
            var sensorChart = new FusionCharts({
                type: 'area2d',
                renderAt: 'chart-container',
                width: '100%',
                height: '50%',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "Sensor's statistics",
                        "subCaption": "Last day",
                        "xAxisName": "Time",
                        "yAxisName": "Value",
                        "paletteColors": "#0075c2",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "showCanvasBorder": "0",
                        "plotBorderAlpha": "10",
                        "usePlotGradientColor": "0",
                        "plotFillAlpha": "50",
                        "showXAxisLine": "1",
                        "axisLineAlpha": "25",
                        "divLineAlpha": "10",
                        "showValues": "1",
                        "showAlternateHGridColor": "0",
                        "captionFontSize": "14",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0",
                        "toolTipColor": "#ffffff",
                        "toolTipBorderThickness": "0",
                        "toolTipBgColor": "#000000",
                        "toolTipBgAlpha": "80",
                        "toolTipBorderRadius": "2",
                        "toolTipPadding": "5"
                    },

                    "data": values
                }
            }).render();
        });

    }

    createArrayOfLabelValues(values: any) {

        let dataArray = [];

        for(let i = values.length - 1; i >= 0; i-- ) {
            dataArray.push({
                "label": new Date(values[i].timestamp).getHours().toString(),
                "value": values[i].value
            });
        }

        return dataArray;
    }



}
