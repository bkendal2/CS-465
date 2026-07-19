import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  public editForm!: FormGroup;
  public trip!: Trip;
  public submitted = false;
  public isSaving = false;
  public isLoading = true;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      this.errorMessage =
        'The selected trip could not be identified. Please choose a trip again.';
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [
        { value: tripCode, disabled: true },
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

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: Trip[]) => {
        if (!value || value.length === 0) {
          this.errorMessage = 'The selected trip could not be found.';
          this.isLoading = false;
          return;
        }

        this.trip = value[0];

        this.editForm.patchValue({
          ...this.trip,
          start: this.formatDateForInput(this.trip.start)
        });

        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Unable to retrieve trip:', error);

        if (error.status === 401) {
          this.errorMessage =
            'Your session has expired. Please log in and try again.';
        } else if (error.status === 404) {
          this.errorMessage = 'The selected trip could not be found.';
        } else {
          this.errorMessage =
            'The trip could not be loaded. Please try again.';
        }

        this.isLoading = false;
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const updatedTrip = this.editForm.getRawValue();

    this.tripDataService.updateTrip(updatedTrip).subscribe({
      next: () => {
        this.router.navigate([''], {
          state: { message: 'Trip updated successfully.' }
        });
      },
      error: (error: any) => {
        console.error('Unable to update trip:', error);

        if (error.status === 401) {
          this.errorMessage =
            'Your session has expired. Please log in and try again.';
        } else if (error.status === 400) {
          this.errorMessage =
            error.error?.message || 'Please correct the trip information.';
        } else if (error.status === 404) {
          this.errorMessage = 'The selected trip could not be found.';
        } else {
          this.errorMessage =
            'The trip could not be updated. Please try again.';
        }

        this.isSaving = false;
      }
    });
  }

  private formatDateForInput(dateValue: string | Date): string {
    if (!dateValue) {
      return '';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0];
  }

  get f() {
    return this.editForm.controls;
  }
}