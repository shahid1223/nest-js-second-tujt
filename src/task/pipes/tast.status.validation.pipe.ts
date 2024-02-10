import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TastStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isValidStatus(value)) {
            throw new BadRequestException(`"${value}" is invalid status!`);
        }
        return value;
    }

    private isValidStatus(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}