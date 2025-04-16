// Task management
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderTasks();
        this.setupEventListeners();
        this.checkNotificationPermission();
        this.setupReminderInterval();
    }

    setupEventListeners() {
        document.getElementById('addTask').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });

        document.getElementById('enableNotifications').addEventListener('click', () => {
            this.requestNotificationPermission();
        });
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (text) {
            const task = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date()
            };
            
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            input.value = '';
            
            // Show notification for new task
            if (Notification.permission === 'granted') {
                this.showNotification('Новая задача', `Добавлена задача: ${text}`);
            }
        }
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        const filteredTasks = this.tasks.filter(task => {
            if (this.currentFilter === 'active') return !task.completed;
            if (this.currentFilter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">Удалить</button>
            `;

            li.querySelector('.task-checkbox').addEventListener('change', () => this.toggleTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));

            taskList.appendChild(li);
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }


    async checkNotificationPermission() {
        if (Notification.permission === 'granted') {
            document.getElementById('enableNotifications').textContent = 'Уведомления включены';
            document.getElementById('enableNotifications').disabled = true;
        }
    }

    async requestNotificationPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                document.getElementById('enableNotifications').textContent = 'Уведомления включены';
                document.getElementById('enableNotifications').disabled = true;
                this.showNotification('Уведомления', 'Уведомления успешно включены!');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }

    showNotification(title, body) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: 'icons/icon-192x192.png'
            });
        }
    }

    setupReminderInterval() {
        setInterval(() => {
            const activeTasks = this.tasks.filter(task => !task.completed);
            if (activeTasks.length > 0 && Notification.permission === 'granted') {
                this.showNotification(
                    'Напоминание о задачах',
                    `У вас есть ${activeTasks.length} невыполненных задач`
                );
            }
        }, 2 * 60 * 60 * 1000); 
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
}); 