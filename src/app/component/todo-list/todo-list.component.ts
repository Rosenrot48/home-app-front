import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CreateTodoComponent} from '../create-todo/create-todo.component';
import {TODO} from '../../model/TODO';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  perspectiveArray: TODO [] = [
    {title: 'Перова', data: 'Создать два отчета о четверга по ТН и ТК', hasHighPriority: true},
    {title: 'Перевод', data: 'Перевести  книгу от Отраднова с 81-116 страницы', hasHighPriority: false},
    {title: 'Экономика предприятия', data: 'Найти конспект по экономике', hasHighPriority: false},
    {title: 'MongoDB', data: 'Прикрутить к данному органайзеру NoSQL MongoDB для работы с персональными данными', hasHighPriority: false},
    {title: 'Node.JS', data: 'Написать бэк на node.js для работы с персональными данными и организовать вызов из MongoDB', hasHighPriority: false}
  ];
  todoList: TODO[] = [];

  constructor(
    public dialog: MatDialog
  ) {
    localStorage.getItem('todoList') !== null ? this.todoList = JSON.parse(localStorage.getItem('todoList'))
      : this.todoList = this.perspectiveArray;
  }

  ngOnInit() {
    console.log(this.todoList);
  }
  ngOnDestroy() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  deleteTODO(item: any) {
    this.todoList.indexOf(item) > -1 ? this.todoList.splice(this.todoList.indexOf(item), 1) : console.log('не найдена задача');
  }

  workWithTODO(todo?: TODO) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'custom-dialog';
    if (todo) {
      dialogConfig.data = todo;
    }
    const dialogRef = this.dialog.open(CreateTodoComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result !== null) {
          const newTODO: TODO = result;
          if (newTODO.data !== null) {
            this.todoList.push(newTODO);
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
          }
        }
    });
  }
  saveLS() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
  deleteLS() {
    localStorage.removeItem('todoList');
    localStorage.getItem('todoList') !== null ? this.todoList = JSON.parse(localStorage.getItem('todoList'))
      : this.todoList = this.perspectiveArray;

  }
}
