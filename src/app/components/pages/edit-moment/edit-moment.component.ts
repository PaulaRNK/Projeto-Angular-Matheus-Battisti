import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moment;
  buttonText: string = 'Editar';
  constructor(private momentService: MomentService,
              private route: ActivatedRoute,
              private messagesService: MessagesService,
              private router:Router){

  }

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((response) =>{
      this.moment = response.data;
    } )
  }

  async editHandler(moment:Moment){
    console.log("editando");
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if(moment.image){
      formData.append('image', moment.image);
    }
    await this.momentService.updateMoment(this.moment.id!, formData).subscribe(()=> {
      this.messagesService.add(`Momento ${moment.id} atualizado com sucesso!`);
      this.router.navigate(["/"]);
    });
  }
}
