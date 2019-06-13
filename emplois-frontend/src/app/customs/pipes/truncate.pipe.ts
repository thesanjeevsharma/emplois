import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class OrdinalPipe implements PipeTransform {
    transform(value : string): string {
        let words = value.split(' ');
        return value;
    }
}