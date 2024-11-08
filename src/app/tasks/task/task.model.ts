export interface Task {
    id: string;
    userId: string;
    title: string;
    status:string;
    summary: string;
    dueDate: string;
  }

  export interface newTask {
    title: string;
    summary: string;
    dueDate: string;
    status:string;
  }