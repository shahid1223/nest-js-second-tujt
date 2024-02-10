import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-filter-task.dto';
import { TastStatusValidationPipe } from './pipes/tast.status.validation.pipe';

@Controller('task')
export class TaskController {
    constructor(private taskServices: TaskService) { }

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskServices.getTaskWithFilter(filterDto);
        } else {
            return this.taskServices.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskServices.getTaskById(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDTO: CreateTaskDTO
    ): Task {
        return this.taskServices.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    updateTaskById(
        @Param('id') id: string,
        @Body('status', TastStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.taskServices.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): string {
        return this.taskServices.deleteTaskById(id);
    }
}
