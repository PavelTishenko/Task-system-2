import { map } from "rxjs/operators";
import { ChartDataService } from "../../services/chart-data.service";
import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";

// import * as pluginDataLabels from 'chartjs-plagin-datalabels';
import { Label } from "ng2-charts";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };
  public barChartLabels: Label[] = [
    "Pavel",
    "Kirill",
    "Evgeniy",
    "Timur",
    "Alina",
    "Evgeniy Kuz",
    "Malahai"
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public charData: any = {
    Kirill: null,
    Evgeniy: null,
    Timur: null,
    Evgeniykuz: null,
    Pavel: null
  };

  public barChartData: ChartDataSets[] = [
    { data: [5, 59, 80, 81, 56, 55, 40], label: "All Tasks" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Done Tasks" }
  ];

  constructor(chartData: ChartDataService) {
    this.charData = chartData.emplData;
  }

  ngOnInit() {}

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const { Pavel, Kirill, Evgeniy, Evgeniykuz, Timur } = this.charData;
    const data = [Pavel, Kirill, Evgeniy, Timur, 0, Evgeniykuz, 0];
    this.barChartData[0].data = data;
  }
}
