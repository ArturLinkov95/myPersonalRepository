export const toDo = {
    list: [
        { name: 'create a post', status: 'In progress', priority: 'low' },
        { name: 'test', status: 'Done', priority: 'high' }
    ],

    showToDoList() {
        const sortedTask = this.list.sort((a, b) => {
            if (a.status < b.status) return -1;
            if (a.status > b.status) return 1;
            return 0;
        });
        console.log(sortedTask);
        console.log();
    },

    showStatusToDo(status) {
        if (status === "In progress" || status === "Done" || status === "To Do") {
            const statusInProgress = this.list.filter(item => item.status === status);
            console.log(statusInProgress);
        }
    },

    addToDoList(name, status, priority) {
        let indexTast = this.list.findIndex(item => item.name === name)
        const canAdd = name.length < 25 && indexTast === -1;
        if (canAdd) {
            return this.list.push({ name, status, priority }),
                toDo.showToDoList();
        }
        else {
            console.log("Задача не добавлена: Имя задачи уже существует");
        }
    },

    deleteToDoList(name) {
        const toDoListIndex = this.list.findIndex(item => item.name === name);
        return this.list.splice(toDoListIndex, 1),
            toDo.showToDoList();
    },

    changeToDoList(name, status, priority) {
        const toDoListIndex = this.list.findIndex(item => item.name === name);
        if (toDoListIndex !== -1) {
            return name, this.list[toDoListIndex].status = status, this.list[toDoListIndex].priority = priority,
                toDo.showToDoList();
        }
        else {
            console.log("Задача не изменена: Задачи с таким имемем не существует");
        }
    }
};