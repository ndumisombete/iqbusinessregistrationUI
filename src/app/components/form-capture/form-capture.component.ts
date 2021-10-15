import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { PersonResponse } from '../../models/person-response';
import { GenericValidator } from '../../shared/generic-validator';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormControlName,
  AbstractControl,
} from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PersonService } from '../../services/person.service';
import { PersonRequest } from 'src/app/models/person-request';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-capture',
  templateUrl: './form-capture.component.html',
  styleUrls: ['./form-capture.component.css'],
})
export class FormCaptureComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  disabled = false;
  errorMessage: string;
//   results: PersonResponse;
  results: PersonResponse;
  formCaptureForm: FormGroup;
//   formResponse: PersonResponse;
  formResponse: PersonResponse;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [id: string]: { [id: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.validationMessages = {
      fullName: {
        required: 'Please enter your fullName.',
      },
      idNumber: {
        required: 'idNumber cannont be empty',
        min: 'TelephoneNumber cannont be less than 13',
      },
      personId: {
        required: 'telephoneNumber',
      },
      telephoneNumber: {
        required: 'telephoneNumber cannont be empty',
        min: 'TelephoneNumber cannont be less than 10',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(this.formCaptureForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.formCaptureForm
        );
      });
  }
  get fullNameCtrl() {
    return this.formCaptureForm.get('fullName').value;
  }

  get idNumberCtrl() {
    return this.formCaptureForm.get('idNumber').value;
  }

  get personIdCtrl() {
    return 0;
  }

  get telephoneNumberCtrl() {
    return this.formCaptureForm.get('telephoneNumber').value;
  }

  createForm(): void {
    this.formCaptureForm = this.fb.group({
      fullName: ['', [Validators.required]],
      idNumber: ['', [Validators.required ,Validators.min(13)]],
      personId: ['', []],
      telephoneNumber: ['', Validators.min(10)],
    });
  }

  resetForm(): void {
    this.formCaptureForm.reset();
  }

  submitForm(): void {
    console.log(this.formCaptureForm.value);
    if (this.formCaptureForm.invalid) {
      this.formCaptureForm.markAllAsTouched();
      this.formCaptureForm.updateValueAndValidity();
      return;
    }

    const formRequest = this.transformPersonRequest();

    this.personService.submitForm(formRequest).subscribe({
      next: (response: PersonResponse) => this.formResponse = response,
      error: (err) => this.errorMessage = err
    })

    const getAllForms = this.getAllForms();

        // console.log(this.getAllForms());

  }

  transformPersonRequest() {
    let personRequest: PersonRequest;
    personRequest = {
      fullName: this.fullNameCtrl,
      idNumber: this.idNumberCtrl,
      personId: this.personIdCtrl,
      telephoneNumber: this.telephoneNumberCtrl,
    };

    return personRequest;
  }

  listPersons = [];

  getAllForms(): void {

    this.personService.getPersons().subscribe((data: any[])=>{
       console.log(data);
      this.listPersons = data;
    })

  }

}
