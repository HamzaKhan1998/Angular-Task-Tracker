import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone:true,
  imports: [CardComponent]
})
export class UserComponent {
  // @Input({required:true}) id!: string;
  // @Input({required:true}) avatar!: string;
  // @Input({required:true}) name!: string;
  @Input ({required:true}) selected!: boolean;
  @Input ({required:true}) user!: User;

  @Output () select = new EventEmitter();

  get imagePath(){
    return 'assets/users/' + this.user.avatar
  }
  onSelectedUser(){
    this.select.emit(this.user.id);
  }

}
