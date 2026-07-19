import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  public submitted = false;
  public isSaving = false;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]{3,10}$/)
        ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      length: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      start: ['', Validators.required],
      resort: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      perPerson: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(/^.+\.(jpg|jpeg|png|webp)$/i)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    this.tripService.addTrip(this.addForm.value).subscribe({
      next: () => {
        this.router.navigate([''], {
          state: { message: 'Trip added successfully.' }
        });
      },
      error: (error: any) => {
        console.error('Unable to add trip:', error);

        if (error.status === 401) {
          this.errorMessage =
            'Your session has expired. Please log in and try again.';
        } else if (error.status === 400) {
          this.errorMessage =
            error.error?.message || 'Please correct the trip information.';
        } else {
          this.errorMessage =
            'The trip could not be saved. Please try again.';
        }

        this.isSaving = false;
      }
    });
  }

  get f() {
    return this.addForm.controls;
  }
}