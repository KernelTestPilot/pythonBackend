import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './services/socket.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  receivedMessage!: any;

  constructor(private socketService: SocketService) {
 
  }
ngOnInit(): void {
  this.socketService.getSession();
  this.socketService.refreshSession().subscribe(
    (data) => {
      // Handle the received data here
      console.log('Received data:', data);
      this.receivedMessage = data;
    },
    (error) => {
      console.error('Error in WebSocket connection:', error);
    }
  );
  this.socketService.refreshMatches().subscribe(
    (data) => {
      // Handle the received data here
      console.log('Received data:', data);
    },
    (error) => {
      console.error('Error in WebSocket connection:', error);
    }
  );
}

ngOnDestroy(): void {
  this.socketService.disconnectSocket();
}
loadSession(){
  this.socketService.getSession();
  this.socketService.getMatches();
}
}
