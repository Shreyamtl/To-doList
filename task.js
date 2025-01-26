const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return; 

    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText} 
        <button class="edit">Edit</button>
        <button class="remove">Remove</button>
    `;

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const removeBtn = li.querySelector('.remove');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        li.remove();
    });
    const editBtn = li.querySelector('.edit');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        taskInput.value = taskText;
        li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = '';
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
