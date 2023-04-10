import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Person } from '../../interface/person.model';
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Person>();
  @Input() btnText!: string;
  @Input() scheduleData: Person | null = null;

  personForm!: FormGroup;
  person: Person = {
    name: '',
    email: '',
    cpf: '',
    date_born: new Date(),
    numbers: [],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.personForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      date_born: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ]),
      numbers: this.formBuilder.array([
        this.formBuilder.group({
          number: [
            '',
            [
              Validators.required,
              Validators.pattern(/^\d+$/),
              Validators.maxLength(11),
              Validators.minLength(9),
            ],
          ],
        }),
      ]),
    });
  }
  createNumber(): FormGroup {
    return this.formBuilder.group({
      number: ['', Validators.required],
    });
  }

  addNumber(): void {
    const numbers = this.personForm.get('numbers') as FormArray;
    numbers.push(this.createNumber());
  }

  Submit(): void {
    if (this.personForm.invalid) {
      return;
    }
    this.person = { ...this.person, ...this.personForm.value };
    console.log(this.person);
    this.onSubmit.emit(this.personForm.value);
  }
  get numbers() {
    return this.personForm.get('numbers') as FormArray;
  }
  removeNumber(index: number): void {
    this.numbers.removeAt(index);
  }
  get number() {
    return this.personForm.get('number')!;
  }
  get name() {
    return this.personForm.get('name')!;
  }
  get email() {
    return this.personForm.get('email')!;
  }
  get cpf() {
    return this.personForm.get('cpf')!;
  }
  get date_born() {
    return this.personForm.get('date_born')!;
  }
}
