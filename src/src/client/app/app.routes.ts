import { Routes } from '@angular/router';

import { ContactsRoutes } from './contacts/index';
import { StatsRoutes } from './stats/index';
import { EventsRoutes } from './events/index';
import { HomeRoutes } from './home/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...ContactsRoutes,
  ...StatsRoutes,
  ...EventsRoutes
];
