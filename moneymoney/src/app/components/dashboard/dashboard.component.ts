import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LoginService} from '@services/login.service';
import {Router} from '@angular/router';
import { Chart } from 'chart.js';
import {DashboardService} from '@services/dashboard.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  filter: any =  {};
  count: number = 1;

  @ViewChild('divChart') divChart:ElementRef;
  constructor(
      private loginSerive: LoginService,
      private  router: Router,
      public componentService: DashboardService,
      private renderer:Renderer2,
      private elementRef:ElementRef
  ) { }

  ngOnInit(): void {
    if(!this.loginSerive.isLoggedIn()){
      this.router.navigate(['login']);
      // window.location.href= 'login'
    }
    this.loadVM();
  }

  loadVM(){

    this.filter = {
      customer: '198kitchen # C01-000223 #',
      device: '[IDC1][BTT-NX02-PRD][198kitchen]_[198kitchen_01-PRD] : IP(172.25.1.46)# (203.150.199.46)',
      edate: '2020-11-02-00-00-00',
      sdate: '2020-11-01-00-00-00',
    }

    this.componentService.findVM(this.filter).subscribe(
        result=>{
          result.disk_data.forEach(item=>{
            let labels = [];
            item.raw_data.map(item=>{
              labels.push(item.datetime);
            })

            let datasets = {
              label: item.name,
              responsive: true,
              data: [],
              fill: false,
              lineTension: 0.2,
              borderColor:'',
              borderWidth: 1
            }
            item.raw_data.map(item=>{
              datasets.data.push(item.downtime);
            })
            datasets.borderColor = this.ramdomColor();

            let data = {
              labels: labels,
              datasets: [datasets]
            }
            console.log(data);
            // console.log(`<canvas id='Chart${this.count}'></canvas>`);
            document.getElementById('divChart').insertAdjacentHTML('beforeend', `<canvas id='Chart${this.count}'></canvas>`);

            this.showChart(data,this.count);
            this.count++;
          })
        })
  }


  showChart(rows:any,index:number) {
    console.log(index);
     new Chart(`Chart${index}`, {
        type: 'line',
        data: rows,
        options: {
          title: {
            text: "Line Chart",
            display: false
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
     })
  }

  ramdomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
  }

}
