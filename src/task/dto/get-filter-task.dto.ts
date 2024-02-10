import { IsEmpty, IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;
    @IsOptional()
    @IsEmpty()
    search: string
}