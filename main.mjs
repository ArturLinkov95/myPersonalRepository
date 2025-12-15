import { toDo } from './app.mjs';

toDo.changeToDoList("test", "To Do", "low");

toDo.addToDoList("Создать шедевр", "To Do", "High");

toDo.addToDoList("Создать шедевр", "To Do", "High");

toDo.changeToDoList("Купить молоко", "To Do", "low");

toDo.addToDoList("Написать картину", "To Do", "High");

toDo.changeToDoList("Написать картину", "In progress", "Medium");

toDo.addToDoList("Вымыть пол", "Done", "Medium");

toDo.showStatusToDo("In progress");

toDo.showStatusToDo("To Do");

toDo.showStatusToDo("Done");

toDo.addToDoList("Атжумания", "To Do", "High");

toDo.addToDoList("Прес качат", "To Do", "High");