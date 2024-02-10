import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-filter-task.dto';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filterDTO: GetTaskFilterDto): Task[] {
        const { search, status } = filterDTO;

        let tasks = this.getAllTasks();

        if (search) {
            tasks = tasks.filter(task => task.title.trim().includes(search) || task.description.trim().includes(search));
        }

        if (status) {
            tasks = tasks.filter(task => task.status == status)
        }

        return tasks
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException(`Task with this id "${id}" not found!`);
        }
        return found;
    }

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;
        let task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id);
        task.status = status;
        return task
    }

    deleteTaskById(id: string): string {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
        return "Task Deleted"
    }
}
