import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
 })
 export class SocketService {
  private webSocket: Socket;
  constructor() {
   this.webSocket = new Socket({
    url: "127.0.0.1:5000/",
    options: {},
   });
  }
 
  // this method is used to start connection/handhshake of socket with server
  connectSocket() {
   this.webSocket.emit('Connect');
  }
 
  // this method is used to get response from server
  refreshSession() {
    return this.webSocket.fromEvent('refresh-session').pipe(
      map((data: any) => {
        console.log(data);
        return data; // You can modify or process the data as needed
      })
    );
  }
  refreshMatches() {
    return this.webSocket.fromEvent('refresh-matches').pipe(
      map((data: any) => {
        console.log(data);
        return data; 
      })
    );
  }
  getSession() {
   return this.webSocket.emit('get-session');
  }
  getMatches() {
    return this.webSocket.emit('get-matches');
   }
  getSocketId(){
    return this.webSocket.ioSocket.id;
  }
  setSession(data: any){
    return this.webSocket.emit('set-session', data)
  }
 
  // this method is used to end web socket connection
  disconnectSocket() {
   this.webSocket.disconnect();
  }
 }