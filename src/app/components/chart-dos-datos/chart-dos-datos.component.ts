import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-dos-datos',
  templateUrl: './chart-dos-datos.component.html',
  styleUrls: ['./chart-dos-datos.component.css']
})
export class ChartDosDatosComponent {

  @Input() data_chart : any;

  // Dibujar la gráfica de las temperaturas a lo largo del día
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: this.textColor
            }, display: true,
        }
    },
    scales: {
        x: {
            ticks: {
                color: this.textColorSecondary
            },
            grid: {
                color: this.surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: this.textColorSecondary
            },
            grid: {
                color: this.surfaceBorder,
                drawBorder: false
            },
            beginAtZero: true,
        }
    }
  };
}
