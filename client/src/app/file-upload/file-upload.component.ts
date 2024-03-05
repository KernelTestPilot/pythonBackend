import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  fileName = '';
  socketid = '';
  constructor(private http: HttpClient, private socketservice: SocketService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

  if (file) {
    this.fileName = file.name;
    
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData = (e.target as any).result;
      this.socketservice.setSession({ user: "oskar", image: imageData });
    };

    reader.readAsDataURL(file);
  }
}

}
