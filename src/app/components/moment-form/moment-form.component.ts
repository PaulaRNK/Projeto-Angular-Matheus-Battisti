import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Moment } from '../../Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>()
  @Input() buttonText!: string;
  @Input() momentData?: Moment;

  momentForm!: FormGroup;

  ngOnInit(): void{
    if(this.momentData){
      this.momentForm = new FormGroup({id: new FormControl(this.momentData.id),
      title: new FormControl(this.momentData.title, [Validators.required]),
      description: new FormControl(this.momentData.description, [Validators.required]),
      image: new FormControl(this.momentData.image)});
    }
    else{
      this.momentForm = new FormGroup({id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')});
    }
  }

  get title(){
    return this.momentForm.get('title')!;
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any){
    const file = event.target.files[0];

    this.momentForm.patchValue({image: file});
  }

  submit(){
    if(this.momentForm.invalid) return;
    
    console.log("Enviou formulário");
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }

}
