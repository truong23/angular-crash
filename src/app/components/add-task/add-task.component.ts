import { UiService } from './../../services/ui.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string
  time!: string
  reminder!: boolean

  showAddTask!: boolean ;
  subcription!: Subscription;

  constructor(private uiService:UiService) { 
    this.subcription = this.uiService
    .onToggle()
    .subscribe((value) => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){
      alert('Please add a task')
      return
    }

    const newTask = {
      text: this.text,
      time: this.time,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)
    this.text = '';
    this.time = '';
    this.reminder = false;
  }

}
