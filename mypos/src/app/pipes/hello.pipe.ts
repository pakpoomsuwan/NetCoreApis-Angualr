import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hello'
})
export class HelloPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value +" **_**";
  }

}
