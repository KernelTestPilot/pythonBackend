import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocketService } from './services/socket.service';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), SocketService,provideHttpClient() ]
};
