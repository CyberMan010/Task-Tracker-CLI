const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

function loadTasks() {

    try{
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch(err){
        return [];
    }
}
function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 4));
}

function addTask(description) {
    const tasks = loadTasks();
    const taskId = tasks.length + 1;
    const task = {
        id: taskId,
        description: description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(task);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${taskId})`);
}

function listTasks(status) {
    const tasks = loadTasks();
    tasks.forEach(task => {
        if (!status || task.status === status) {
            console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`);
        }
    });
}

function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add':
            if (args.length < 2) {
                console.log('Usage: task-cli add <description>');
                return;
            }
            addTask(args[1]);
            break;
        case 'list':
            const status = args[1];
            listTasks(status);
            break;
        default:
            console.log('Unknown command');
    }
}

main();