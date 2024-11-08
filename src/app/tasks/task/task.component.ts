import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @Input ({required: true}) task!: Task;
  @Output () complete = new EventEmitter<string>();

  onCompleteTask (){
    console.log('Task completed');
    this.complete.emit(this.task.id);
  }
}
