import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TODO} from '../../model/TODO';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  todoForm = this.fb.group({
    title: [null],
    data: [null],
    hasHighPriority: [null]
  });

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateTodoComponent>,
              @Inject(MAT_DIALOG_DATA) data,
  ) {
    if (data !== null) {
      this.todoForm.setValue(
        {title: data.title, data: data.data, hasHighPriority: data.hasHighPriority}
      );
    }
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
  createTODO() {
    const todo = new TODO();
    todo.title = this.todoForm.get('title').value;
    todo.data = this.todoForm.get('data').value;
    todo.hasHighPriority = this.todoForm.get('hasHighPriority').value;
    // this.dialogRef.close();
    this.dialogRef.close(todo);
  }

}
