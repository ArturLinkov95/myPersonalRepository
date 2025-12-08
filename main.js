const todo = {
    list: {},
    status: {
        "ToDo": "To Do",
        "InProgress": "In Progress",
        "Done": "Done"
    },
    statusToDo(statusName, displayName) {
        console.log(`"${displayName}:"`)
        let foundTask = false;
        for (const name in this.list) {
            if (this.list[name] === this.status[statusName]) {
                console.log(`    "${name}"`)
                foundTask = true;
            }
        }
        if (foundTask !== true) {
            console.log("    -")
        }
    },
    // statusInProgress() {
    //     console.log("In Progress:")
    //     let foundTask = false;
    //     for (const name in this.list) {
    //         if (this.list[name] === this.status["InProgress"]) {
    //             console.log(`    "${name}"`)
    //             foundTask = true;
    //         }
    //     }
    //     if (foundTask !== true) {
    //         console.log("    -")
    //     }
    // },
    // statusDone() {
    //     console.log("Done:")
    //     let foundTask = false;
    //     for (const name in this.list) {
    //         if (this.list[name] === this.status["Done"]) {
    //             console.log(`    "${name}"`);
    //             foundTask = true;
    //         }
    //     }
    //     if (foundTask !== true) {
    //         console.log("    -")
    //     }
    // },
    showList() {
        todo.statusToDo("ToDo", "To Do");
        todo.statusToDo("InProgress", "In Progress");
        todo.statusToDo("Done", "Done");
    },
    addTask(name) {
        if (name.length < 25 && !(name in this.list)) {
            this.list[name] = "To Do";
        }
        else { }
    },
    changeStatus(name, status) {
        if (this.list[name]) {
            this.list[name] = status;
        }
        else { }
    },
    deleteTask(name) {
        delete this.list[name];
    }
};

todo.addTask("Почитать \"Преступление и наказание\"");
todo.addTask("Вымыть пол");
todo.addTask("Полить цветы");
todo.addTask("Прогуляться");

todo.changeStatus("Прочесть книгу", "Done");

todo.changeStatus("Вымыть пол", "Done");

todo.deleteTask("Прогуляться");

todo.addTask("Полить цветы");

todo.showList();