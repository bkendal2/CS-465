import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: TripListing },
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip', component: EditTrip },
  { path: 'login', component: Login }
];