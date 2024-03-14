import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './services/socket.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
 interface User {
  session_age: string
  session_gender: string
  user: string
  active_users: any[]
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  receivedMessage!: any;
  matches: any[] = [];
  messsages: any[] =[];
  user_information: User | null = null;
  constructor(private socketService: SocketService) {
 
  }
ngOnInit(): void {
 this.refreshSession();
 this.refreshMatches();
 this.receieveMessages();
}
refreshSession(){
  //receieves the socket id and information when user is logged in
  this.socketService.refreshSession().subscribe(
    (data) => {
      // Handle the received data here
      console.log('Received data:', data);
      this.user_information= data;
      console.log(this.user_information)
    },
    (error) => {
      console.error('Error in WebSocket connection:', error);
    }
  );
}
refreshMatches(){
  this.socketService.refreshMatches().subscribe({
    next: (data: any) => {
      // Assign the received data to the matches property
      this.matches = data.matches;
      console.log('Received data:', this.matches);
    },
    error: (error) => {
      // Log any errors that occur during the WebSocket connection
      console.error('Error in WebSocket connection:', error);
    }
  });
}
receieveMessages(){
  this.socketService.receieveMessage().subscribe({
    next: (data: any) => {
      // Assign the received data to the matches property
      console.log(data)
      this.messsages.push(data)
      console.log('Received data:', this.matches);
    },
    error: (error) => {
      // Log any errors that occur during the WebSocket connection
      console.error('Error in WebSocket connection:', error);
    }
  });
}
ngOnDestroy(): void {
  this.socketService.disconnectSocket();
}
sendMessage(data: any, message: any){
    this.socketService.sendMessege(data, message)
}
loadSession(){
  this.socketService.getSession();
  this.socketService.getMatches();
  console.log(this.matches)
}
}
