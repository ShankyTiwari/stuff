import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/* Importing services starts*/
import { ChatService } from './../../../services/chat/chat.service';
import { SocketService } from './../../../services/socket/socket.service';
/* Importing services ends*/

/* importing interfaces starts */
import { SelectedUser } from './../../../interfaces/selected-user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';
import { MessagesResponse } from './../../../interfaces/messages-response';
/* importing interfaces ends */

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  private userId: string = null;
  public chatListUsers: SelectedUser[] = [];
  private selectedUserId: string = null;

  /* Incoming data from other component starts */
  @Input() conversation: string;
  @Input() selectedUserInfo: string;
  /* Incoming data from other component ends */

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
