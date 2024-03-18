import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FileUploadComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  errorMsg: any;
  constructor(private socketService: SocketService, private router: Router) {
 
  }
ngOnInit(): void {
 this.refreshSession();
}

refreshSession(){
  //receieves the socket id and information when user is logged in
  this.socketService.refreshSession().subscribe(
    (data) => {
      if(data){
        this.router.navigate(['/matches'])
      }else{
        this.errorMsg = "Can't read a face from the image!"
      }

    },
    (error) => {
      console.error('Error in WebSocket connection:', error);
    }
  );
}
}
