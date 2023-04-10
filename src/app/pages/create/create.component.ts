import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { Person } from '../../interface/person.model';

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

    // Adicione os números como itens separados no FormData
    person.numbers.forEach((number) => {
      formData.append('numbers[]', number.toString()); // Converter o número para string antes de adicioná-lo
    });

    formData.append('date_born', new Date(person.date_born).toISOString());

    console.log(formData);
    this.scheduleService.createTest(formData).subscribe();
  }
}
