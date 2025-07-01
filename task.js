let todoCount = 0;
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const summary = document.getElementById('summary');
const emptyMsg = document.getElementById('emptyMsg');
const searchBox = document.getElementById('searchBox');

taskInput.addEventListener('input', () => {
    const text = taskInput.value.trim();
    if (text === '') {
        taskInput.style.borderColor = 'plum';
    } else if (isDuplicate(text)) {
        taskInput.style.borderColor = 'red';
    } else {
        taskInput.style.borderColor = 'green';
    }
});

function isDuplicate(taskText) {
    const items = document.querySelectorAll('#taskList li h4');
    return Array.from(items).some(h4 => {
        const textOnly = h4.innerText.split('. ').slice(1).join('. ').toLowerCase();
        return textOnly === taskText.toLowerCase();
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    if (isDuplicate(taskText)) {
        showNotification("Duplicate task not allowed!", "error");
        return;
    }

    todoCount++;

    const li = document.createElement('li');
    li.style.backgroundColor = "#e0ffe0";
    setTimeout(() => li.style.backgroundColor = '', 1000);

    const h4 = document.createElement('h4');
    h4.innerText = `${todoCount}. ${taskText}`;

    const doneBtn = document.createElement('button');
    doneBtn.className = 'edit';
    doneBtn.innerText = "✔";
    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateSummary();
    });

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.innerText = "Edit";
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskInput.value = h4.innerText;
        li.remove();
        updateSummary();
        renumberTodos();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.innerText = "🗑️";
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            renumberTodos();
            updateSummary();
        }, 500);
    });

    li.appendChild(h4);
    li.appendChild(doneBtn);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    taskList.appendChild(li);
    taskInput.value = '';
    showNotification("Task added!", "success");
    updateSummary();
}

function updateSummary() {
    const total = document.querySelectorAll('#taskList li').length;
    const pending = document.querySelectorAll('#taskList li:not(.completed)').length;
    summary.innerText = `Total: ${total} | Pending: ${pending}`;
    emptyMsg.style.display = total === 0 ? 'block' : 'none';
}

// ✅ Notification System
function showNotification(msg, type) {
    const note = document.createElement("div");
    note.innerText = msg;
    note.style.position = "fixed";
    note.style.bottom = "20px";
    note.style.left = "50%";
    note.style.transform = "translateX(-50%)";
    note.style.padding = "10px 20px";
    note.style.borderRadius = "6px";
    note.style.zIndex = "1000";
    note.style.fontWeight = "bold";
    note.style.color = "#fff";
    note.style.backgroundColor = type === "success" ? "green" : "red";
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 1500);
}

// ✅ Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

clearBtn.addEventListener('click', () => {
    taskInput.value = '';
});

searchBox.addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    document.querySelectorAll('#taskList li').forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(keyword) ? 'flex' : 'none';
    });
});
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function renumberTodos() {
    const items = document.querySelectorAll('#taskList li h4');
    todoCount = 0;
    items.forEach(h4 => {
        const original = h4.innerText.split('. ').slice(1).join('. ');
        todoCount++;
        h4.innerText = `${todoCount}. ${original}`;
    });
}
