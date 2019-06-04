import { Component, OnInit,DoCheck,OnDestroy } from '@angular/core';
const todos = [
  {
    id: 1,
    title: '吃饭',
    done: true
  },
  {
    id: 2,
    title: '睡觉',
    done: false
  },
  {
    id: 3,
    title: '打豆豆',
    done: false
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  public todos: {
    id: number,
    title: string,
    done: boolean
  }[] = JSON.parse(window.localStorage.getItem('todos') || '[]')
  public currentEditing: {
    id: number,
    title: string,
    done: boolean
  }[] = null;

  ngOnInit() {  
    this.handleHash()
    window.onhashchange =this.handleHash.bind(this)
  }
  ngDoCheck(){
    window.localStorage.setItem('todos',JSON.stringify(this.todos))
  }
  
  public visibility='all';
  get filterTodos(){
    if(this.visibility==='all'){
      return this.todos
    }else if(this.visibility==='active'){
      return this.todos.filter(t=>t.done==true)
    }else if(this.visibility = 'completed'){
      return this.todos.filter(t=>t.done==false)
    }
  }
  handleHash(){
    let hash = location.hash
    switch (hash.slice(hash.indexOf('/'))) {
      case '/':
        this.visibility = 'all'
        break;
      case '/active':
        this.visibility = 'active'
        break;
      case '/completed':
        this.visibility = 'completed'
        break;
    };
  }
  handleChange(e): void {
    const val = e.target.value;
    let id = this.todos[this.todos.length - 1]
    if (!val.length) {
      return
    }
    this.todos.push({
      id: id ? id.id + 1 : 1,
      title: val,
      done: false
    })
    e.target.value = ""
  }
  delete(i) {
    this.todos.splice(i, 1)
  }
  get toggleAll() {
    return this.todos.every(todos => todos.done)
  }
  set toggleAll(val) {
    this.todos.forEach(t => t.done = val)
  }
  saveEdit(item, e) {
    item.title = e.target.value
    this.currentEditing = null;
  }
  handledbClick(item, i) {
    console.log(item + " " + i);
    var input = document.getElementsByClassName('edit')

    this.currentEditing = item
  }
  handleKeyUp(e) {
    const { keyCode } = e;
    if (keyCode == 27) {
      this.currentEditing = null
    }
  }
  get remaningCount() {
    return this.todos.filter(item => item.done == false).length
  }
  handleClick() {
    this.todos = this.todos.filter(item => item.done != true)
  }
}
