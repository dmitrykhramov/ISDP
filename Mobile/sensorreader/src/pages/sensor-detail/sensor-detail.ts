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
    labelStep: number;

    constructor(public nav: NavController, public params: NavParams, public dataService: Data) {

        this.url = this.params.get('url');
        this.end = this.params.get('end');
        this.getDataForGraph(24);

    }


    drawTheChart(values: any) {

        let step = this.labelStep;

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
                        "toolTipPadding": "5",
                        "labelStep": step
                    },

                    "data": values
                }
            }).render();
        });

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
            console.log('day data');
        } else if (time === 7) {
            date.setDate(date.getDate() - 8);
            console.log('week data');
        } else if (time === 30) {
            date.setDate(date.getDate() - 31);
            console.log('month data');
        }

        this.start = date.getTime();

        this.dataService.getSensorValues(this.url, this.start, this.end).subscribe(data => {

            let graphData = this.createLabelValueArray(data, time);
            this.drawTheChart(graphData);

        }, (err) => {
            console.log(err);
        });

    }


}
