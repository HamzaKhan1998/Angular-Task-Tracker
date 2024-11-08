import { Component, Input, SimpleChanges } from '@angular/core';
import { newTask, Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  @Input() filter: string = '';
  isAddingTask = false;

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private tasksService: TasksService) {
    //console.log("Constructor of app-tasks")
    //this.data$ = this.tasksService.getUserTasks(this.userId);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("in here", changes);
    // if (changes['userId']) {
    //   this.tasksService.getUserTasks(this.userId).subscribe(
    //     (tasks) => this.tasks = tasks
    //   );
    // }
    // if (changes['filter'] || changes['tasks']) {
    //   this.applyFilter(); 
    // }
  }

  ngDoCheck(): void { 
    //console.log("ngDoCheck in app-tasks"); 
  }

  get selectedUserTasks() {
    this.tasks = this.tasksService.getUserTasks(this.userId);
    this.filteredTasks = this.tasks;
    this.applyFilter(); 
    return this.filteredTasks;
  }

  applyFilter() {
    console.log("applyFilter:", this.filter);
    if (this.filter) {
      this.filteredTasks = this.tasks.filter(task => task.status === this.filter);
    } else {
      this.filteredTasks = this.tasks; 
    }
  }

  onCompleteTask(id: string) {
    this.tasksService.completeTask(id).subscribe(() => this);
  }

  onAddTask() {
    this.isAddingTask = true;
  }

  onCloseTask() {
    this.isAddingTask = false;
  }
}
