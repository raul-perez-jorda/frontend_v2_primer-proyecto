import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppModule } from 'src/app/app.module';
import { Log } from 'src/app/interfaces/log';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs : Log[] = [];

  constructor(private router: Router,
              private logsService: LogsService) {}

  ngOnInit() {
    this.getLogList();
  }

  getLogList() {
    this.logsService.getLogs().subscribe(
      response => {
        this.logs = response

        this.logs.forEach(log => {
          log.fecha = this.formatDate(log.fecha)
        })

        console.log(this.logs)
      }
    )
  }

  goClientesList() {
    this.router.navigate(['/administrador']);
  }

  private formatDate(date: string): string {
    const momentDate = moment(date);
    const timeZone = 'Europe/Madrid';

    const formattedDate = momentDate.tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

    return formattedDate;
  }
}
