import { Component, Input } from '@angular/core';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent {
  @Input() match: any;
  constructor(private socketService: SocketService) {
 
  }


  receieveMessages(){
    this.socketService.receieveMessage().subscribe({
      next: (data: any) => {
        // Assign the received data to the matches property
        //this.messsages.push(data)
      },
      error: (error) => {
        // Log any errors that occur during the WebSocket connection
        console.error('Error in WebSocket connection:', error);
      }
    });
  }
}
