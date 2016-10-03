import { Routes } from '@angular/router';

import { EventsRoutes } from './events/index';
import { HomeRoutes } from './home/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...EventsRoutes
];
