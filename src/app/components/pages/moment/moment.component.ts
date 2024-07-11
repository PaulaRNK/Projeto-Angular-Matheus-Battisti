import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moment';
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from '../../../../environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { MessagesService } from '../../../services/messages.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ComentService } from '../../../services/coment.service';

import { Comment } from '../../../Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(private momentService: MomentService,  
              private route:ActivatedRoute,
              private messagesService:MessagesService,
              private router:Router,
              private commentService: ComentService){
  }

  ngOnInit(): void{
    //obter id da url
    const id: number = Number(this.route.snapshot.paramMap.get("id"));
    this.momentService.getMoment(id).subscribe((response) => {
      //response.data.created_at?.toLocaleLowerCase('pt-BR')
      this.moment = response.data;
    })

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    console.log("removendo");

    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluído com sucesso");

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid) return;

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment) => {
      this.moment!.comments!.push(comment.data);
      this.messagesService.add("Comentário adicionado com sucesso");
      this.commentForm.reset();
      formDirective.resetForm();
    })

  }
}
