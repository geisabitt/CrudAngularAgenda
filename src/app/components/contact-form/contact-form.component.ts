import { ScheduleService } from 'src/app/services/schedule.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ScheduleService
  ) {}

  ngOnInit() {
    this.createContactForm();
  }

  createContactForm() {
    const phoneNumbers = this.contactForm.get('numbers') as FormArray;
    const numbers = phoneNumbers.controls
      .map((control) => control.value)
      .filter((value) => !!value);
    this.contactForm.patchValue({ numbers: numbers.map(String) });
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(150),
        ],
      ],
      numbers: this.fb.array([this.createPhoneNumberFormControl()]), // Atualize aqui
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      date_born: ['', Validators.required],
    });
  }

  createPhoneNumberFormControl(): FormControl {
    return this.fb.control('', [
      Validators.required,
      Validators.pattern(/^\d{9,11}$/),
    ]);
  }

  get phoneNumbers() {
    return this.contactForm.get('numbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.fb.control('', Validators.required));
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  registerContact() {
    if (this.contactForm.invalid) {
      console.log('formulário inválido');
      return;
    }

    const formValue = this.contactForm.value;
    formValue.numbers = formValue.numbers.map(
      (number: { number: string }) => number.number
    );
    console.log(formValue);
    this.contactService.registerContact(formValue).subscribe();
  }
}
