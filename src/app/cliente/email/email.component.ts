import { Component, Input } from '@angular/core';
import { EmailService } from './email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent {

  @Input() email_destino!: string

  constructor(private emailService: EmailService) { }

  
}
