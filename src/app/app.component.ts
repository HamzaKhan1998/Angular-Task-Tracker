import { Component, ElementRef, signal, Signal, ViewChild } from '@angular/core';
import { TasksService } from './tasks/tasks.service';
import { User } from './user/user.model';
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course-app';
  users!: User[];
  selectedUserId?: string;
  isDisabled: boolean = true;
  filter: string = '';
  activeButton: number = 0;
  @ViewChild('loaderDiv') loaderDivStyle!: ElementRef;
  displayUsers = signal(false);

  constructor(private taskService: TasksService) {
    console.log("constructor of app.component.ts"); 
    setTimeout(() => {
      this.users = this.taskService.getAllUserData();
      this.loaderDivStyle.nativeElement.style.display = 'none';
      this.displayUsers.set(!this.displayUsers());
    }, 2000);
    
  }

  get selectedUser(){
    return this.users.find(u => u.id === this.selectedUserId);
  }
  onSelectUserFromApp (id: string){
    this.selectedUserId = id;
    this.isDisabled = false;
  }

  setFilter(status: string, buttonId: number) {
    this.activeButton = buttonId;
    console.log(status);
    this.filter = status;
  }

}
