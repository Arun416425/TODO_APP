import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo_app');
  newTodo = signal('');

  todos = signal<{ text: string, done: boolean }[]>(JSON.parse(localStorage.getItem('todos') || "[]"));
  
  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.todos()));
    })
  }

  addTodo() {
    const text = this.newTodo().trim()

    if (text === "") {
      alert("Please Write a todo")
      return
    }

    this.todos.update(list => [...list, { text, done: false }])

    this.newTodo.set('')
  }

  toggleTodo(index: number) {
    this.todos.update(list => list.map((item, i) => i === index ? { ...item, done: !item.done } : item))
  }

  deleteTodo(index: number) {
    this.todos.update(list => list.filter((_, i) => i !== index))
  }
}
