import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/interface/person.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent {
  displayedColumns: string[] = [
    'name',
    'numbers',
    'email',
    'cpf',
    'date_born',
    'actions',
  ];
  agenda: any[] = [];
  person$: Person[] = [];

  constructor(private scheduleService: ScheduleService) {
    //this.agenda = this.scheduleService.list2();
    //console.log(this.agenda)
    this.scheduleService.list().subscribe((data: Person[]) => {
      this.person$ = data;
      console.log(this.person$);
    });
  }
  ngOnInit(): void {}
}
