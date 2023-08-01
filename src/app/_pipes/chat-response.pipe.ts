import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatResponse',
  pure: true,
})
export class ChatResponsePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(typeof value === 'string') return value.replaceAll('\n', '<br>')
    return value;
  }

}
