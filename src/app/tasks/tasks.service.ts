import { DestroyRef, inject, Injectable } from "@angular/core";
import { newTask, Task } from "./task/task.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { User } from "../user/user.model";

@Injectable({ providedIn: 'root' })
export class TasksService {
  private apiUrlForTasks = 'http://localhost:3000/tasks';

  private apiUrlForUsers = 'http://localhost:3000/users';

  private tasks!: Task[];
  private users!: User[];
  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) { 
    const subscriptionForTasks = this.http.get<{ data: Task[]}>(this.apiUrlForTasks).subscribe({
      next: (tasks) => {
        this.tasks = tasks.data.sort((a, b) => {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return dateA - dateB; // Ascending order
          // Use `return dateB - dateA;` for descending order
        });;
        console.log('Tasks Received:', tasks);
      },
      error: (error) => {
        console.error('Error retrieving tasks:', error);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscriptionForTasks.unsubscribe();
      console.log('tasks:', this.tasks);
    })

    const subscriptionForUsers = this.http.get<{ data: User[]}>(this.apiUrlForUsers).subscribe({
      next: (users) => {
        this.users = users.data;
        console.log('Users Received:', users);
      },
      error: (error) => {
        console.error('Error retrieving users:', error);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscriptionForUsers.unsubscribe();
      console.log('users:', this.users);
    })
    
  }

  ngOnInit() {
    console.log('ngOnInit of service:');
  }

  getAllUserData(){
    return this.users;
  }

  getUserTasks(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

  addTask(taskData: newTask, userId: string) {
    const mergedTask = {
      ...taskData,  
      userId: userId,
      id: new Date().getTime().toString() 
    };
    console.log('addTask in service');
    //console.log(mergedTask);
    this.tasks.unshift(mergedTask);
    const url = `${this.apiUrlForTasks}`;
    return this.http.post(url, mergedTask).pipe(
      catchError(() => {
        console.error('Error adding task:', taskData);
        return throwError(() => new Error('Error in addTask'))
      })
    ) ;
  }

  completeTask(id: string) {
    console.log('completeTask in service');
    this.tasks = this.tasks.filter(task => task.id !== id);
    const url = `${this.apiUrlForTasks}/${id}`;
    return this.http.delete(url).pipe(
      catchError(() => {
        console.error('Error completing task:', id);
        return throwError(() => new Error('Error in completeTask'))
      })
    ) ;
  }
}