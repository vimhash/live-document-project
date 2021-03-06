import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Docs } from '../models/docs';
import { SocketJwtService } from './socket-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  currentDoc = this.socket.fromEvent<Docs>('manageData');
  currentUserName = this.socket.fromEvent<string>('userName');
  docs = this.socket.fromEvent<string[]>('getData');

  constructor(private socket: SocketJwtService) {}

  getDoc(id: string) {
    this.socket.emit('getDoc', id);
  }

  addDoc(doc) {
    if (this.socket.ioSocket.connected) {
      this.socket.emit('addDoc', doc);
    } else {
      alert('Invalid token');
    }
  }

  editDoc(doc: Docs) {
    this.socket.emit('editDoc', doc);
  }

  lastUserChange(userName) {
    console.log(this.currentUserName);
    this.socket.emit('lastUserChange', userName);
  }
}
