import { UsersService } from './../services/users.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LineController, CategoryScale, LinearScale, Title, Legend, PointElement, LineElement, Tooltip } from 'chart.js';
import { SecurityService } from '../services/security.service';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Userdto } from '../models/Userdto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSpecificUser: boolean=false;
  debounceTimer: any;
  user!: Userdto;
  users!: Userdto[];
  selectedUser:string = "Select User";
  accountUtilization!: number;
  utilizationRatio!: number;
  accountActivity!: number;
  FeeIncomePerAccount!: any;

  constructor(private usersService: UsersService, public securityService: SecurityService) {}
  clientUserName!: string;
  username!: string;

  @ViewChild('chartLine') chartLine!: ElementRef;
  lineChart: Chart | null = null;

  isEmployee: boolean = this.securityService.hasRoleIn(['EMPLOYEE']);


  ngOnInit(): void {
    if (this.securityService.profile && this.securityService.profile.username) {
      console.log(this.securityService.profile);
      this.username = this.securityService.profile.username;
    }
    this.getPercentageOutgoingTransfers(this.username);
    this.getAccountUtilization();
    this.getAccountActivityRatio();
    this.createLineChart(this.username);
    this.retrieveAllUsers();
    this.hgetFeeIncomePerAccount();
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

  theTotal!: number;
  hgetFeeIncomePerAccount(): void {
    this.usersService.getFeeIncomePerAccount(this.username)
      .subscribe((response: any) => {
        const keys = Object.keys(response);
        if (keys.length > 0 && !isNaN(Number(keys[0]))) {
          const firstKey = Number(keys[0]);
          this.theTotal =firstKey;
          console.log('First key:', this.theTotal);
        } else {
          console.error('No numeric keys found in the response.');
        }
      }, (error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
      });
  }


  retrieveAllUsers(): void {
    this.usersService.retrieveAllUsers().subscribe({
      next: (data: Userdto[]) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
        // Handle error
      }
    });
  }

  onUserSelect(event: any): void {
    const selectedValue: string | null = event?.target?.value;
  if (selectedValue) {
    console.log("selected user " +selectedValue )
    if (this.lineChart) {
      this.lineChart.destroy();
      console.log("chart destroyd");

    }

   this.createLineChart(selectedValue);
   console.log("chart created");

  }}

  onInputChange(event: Event): void {

    const value = (event.target as HTMLInputElement).value;
    this.clientUserName = value;
    if (this.clientUserName) {
      this.createLineChart(this.clientUserName);
    } else {
      this.createLineChart(this.clientUserName);
    }
  }




 createLineChart(username: string) {
  forkJoin([
    this.getPercentageOutgoingTransfers(username).pipe(
      catchError(error => {
        console.error('Error fetching Out going Transfers:', error);
        return of(Array(12).fill(0));
      })
    ),
    this.getFeeIncomePerAccount(username).pipe(
      catchError(error => {
        console.error('Error fetching Fee Income Per Account:', error);
        return of(Array(12).fill(0));
      })
    )
  ]).subscribe(([outgoingTransfers, feeIncomePerAccount]) => {
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

  this.lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
          label: "Out going Transfers",
          borderColor: "#cb0c9f",
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          cubicInterpolationMode: 'monotone',
          data: outgoingTransfers,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Fee Income Per Account",
          borderColor: "#3A416F",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          cubicInterpolationMode: 'monotone',
          data: feeIncomePerAccount,
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
});
}



getPercentageOutgoingTransfers(username: string) {
  return  this.usersService.getPercentageOutgoingTransfers(username);
}


getFeeIncomePerAccount(username: string): Observable<number[]> {
  return  this.usersService.getFeeIncomePerAccount(username).pipe(
    map(response => response[Object.keys(response)[0]]),
    catchError((error: HttpErrorResponse) => {
      console.error('An error occurred:', error);
      return throwError(error);
    })
  );
}

}
