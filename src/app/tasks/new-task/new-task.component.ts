import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { newTask } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  private tasksService = inject(TasksService);
  onCancel() {
    this.close.emit();
  }

  @ViewChild('datePicker') datePickerStyle!: any;

  ngAfterViewInit() {
    const today = new Date(); 
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const day = today.getDate().toString().padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${day}`; 
    this.datePickerStyle.nativeElement.setAttribute('min', formattedDate);
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle, 
        status: "Active",
        summary: this.enteredSummary, 
        dueDate: this.enteredDueDate
      } ,this.userId
    ).subscribe({
      next: (response) => console.log('Task added successfully:', response),
      error: (error) => console.error('Failed to add task:', error)
    });
    this.close.emit();
  }
}

