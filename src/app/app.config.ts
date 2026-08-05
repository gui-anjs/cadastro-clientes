import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. ADICIONE ESSA LINHA DE IMPORT AQUI NO TOPO:
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. ADICIONE A VÍRGULA NO FINAL DESTA LINHA:
    provideHttpClient(), 
    // ... os outros comandos que já estavam aí vão continuar embaixo sem problema
  ]
};