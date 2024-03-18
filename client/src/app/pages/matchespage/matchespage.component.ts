import { Component,OnDestroy,OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-matchespage',
  standalone: true,
  imports: [],
  templateUrl: './matchespage.component.html',
  styleUrl: './matchespage.component.scss'
})
export class MatchespageComponent implements OnInit, OnDestroy {
  matches: any;
  constructor(private socketService: SocketService) {
 
  }
  ngOnInit(){
    this.refreshMatches();
  }
  ngOnDestroy(): void {
    this.socketService.disconnectSocket();

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
  
}
