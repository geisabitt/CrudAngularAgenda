import { Component, OnInit } from '@angular/core';

import { Person } from '../../interface/person.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  btnText = 'Salvar Contato';

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {}

  async createHandler(person: Person) {
    console.log('deu boa');

    const formData = new FormData();

    formData.append('name', person.name);
    formData.append('email', person.email);
    formData.append('cpf', person.cpf);
    for (let number of person.numbers) {
      formData.append('numbers[]', String(number)); // Passar o número diretamente, sem converter para string
    }
    formData.append('date_born', new Date(person.date_born).toISOString());

    console.log(formData);
    this.scheduleService.createTest(formData).subscribe();
  }
}
