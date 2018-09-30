import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessagesComponent implements OnInit {
    messages: string[] = [];
    constructor(public messageService: MessageService) {}

    ngOnInit() {
    }
 /*
    getMessages(): void {
        this.messages = this.messageService.getMessages();
    }

    onClear(): void {
        this.messages = [];
        this.messageService.clear();
    }

    add(message: string): void {
        this.messageService.add('message');
    }
    */
}

