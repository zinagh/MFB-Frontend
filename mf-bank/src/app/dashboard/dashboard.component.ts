import { UsersService } from './../services/users.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LineController, CategoryScale, LinearScale, Title, Legend, PointElement, LineElement, Tooltip } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit , OnInit {

  isEmployee: boolean = true;
  accountUtilization!: number;
  utilizationRatio!: number;
  accountActivity!: number;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAccountUtilization();
    this.getAccountActivityRatio();
  }

  getAccountUtilization(): void {
    this.usersService.getAccountUtilizationRatio()
      .subscribe(data => {
        this.accountUtilization = data / 100;
      });
  }

  getAccountActivityRatio(): void {
    this.usersService.getAccountUtilizationRatio()
      .subscribe(data => {
        this.accountActivity = data / 100;
        console.log("heyyyy:" + this.accountActivity)

      });
  }




  @ViewChild('chartLine') chartLine!: ElementRef;
  ngAfterViewInit(): void {
    this.createLineChart();
}


createLineChart() {
  Chart.register(LineController, CategoryScale, LinearScale, Title, Legend, PointElement, LineElement, Tooltip);

  var ctx1: any = document.getElementById("chart-line");
  var ctx = ctx1.getContext("2d");

  const gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);
  gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
  gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
  gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)');

  const gradientStroke2 = ctx.createLinearGradient(0, 230, 0, 50);
  gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
  gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
  gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)');

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
          label: "Mobile apps",
          borderColor: "#cb0c9f",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          cubicInterpolationMode: 'monotone',
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Websites",
          borderColor: "#3A416F",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          cubicInterpolationMode: 'monotone',
          data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        y: {
          grid: {
            display: true,
            color: "#b2b9bf",
            lineWidth: 1,
          },
          ticks: {
            display: true,
            padding: 10,
            color: '#b2b9bf',
            font: {
              size: 11,
              family: "Open Sans",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
        x: {
          grid: {
            display: false,
            color: "#b2b9bf",
            lineWidth: 0,
          },
          ticks: {
            display: true,
            color: '#b2b9bf',
            padding: 20,
            font: {
              size: 11,
              family: "Open Sans",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
      },
      elements: {
        line: {
          tension: 0.4
        }
      }
    },
  });

}



}
