import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';

import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  buttonText: string = "Compartilhar!";

  constructor(private momentService: MomentService, 
              private messagesServive: MessagesService,
              private router: Router){

  }

  createHandler(moment: Moment){
    console.log('Emitido');

    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if(moment.image) formData.append('image', moment.image);

    // ENVIAR DADOS AO SERVICE
    this.momentService.createMoment(formData).subscribe(() =>{
      this.messagesServive.add("Momento adicionado com sucesso");
      // REDIRECT
      this.router.navigate(['/']);
    } );
    // EXIBIR MSG
    
  }

  
}
