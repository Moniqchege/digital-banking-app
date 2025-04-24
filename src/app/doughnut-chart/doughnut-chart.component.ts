import { Component, Input, OnChanges, ElementRef, ViewChild, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() chartType: ChartType = 'doughnut';
  @Input() chartData!: any;
  @Input() chartOptions!: any;
  @ViewChild('doughnutChart', { static: true }) chartRef!: ElementRef;
  chart!: Chart;

  ngOnInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }

  initChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  
    if (this.chartRef && this.chartData && this.chartOptions && this.chartType) {
      const canvas = this.chartRef.nativeElement as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: this.chartType,
          data: this.chartData,
          options: this.chartOptions
        });
      }
    }
  }
  
}
