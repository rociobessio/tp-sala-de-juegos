import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { enviroment } from '../env/enviroment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(enviroment))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideHttpClient()//-->Para poder usar HTTP sin error!
  ]
};
