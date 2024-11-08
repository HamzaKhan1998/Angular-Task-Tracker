import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { CardComponent } from './shared/card/card.component';
import { TasksService } from './tasks/tasks.service';


export function initializeApp(tasksService: TasksService) {
  return () => {} 
}

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    NewTaskComponent,
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    UserComponent,
    FormsModule,
    CardComponent,
    HttpClientModule
],
  providers: [TasksService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TasksService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
