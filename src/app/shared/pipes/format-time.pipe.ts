import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      let time = value.split('T')[1].split('H')[0]+':'
      time = time + value.split('H')[1].split('M')[0] + ':'
      time = time + value.split('M')[1].split('S')[0]
      return  time;
    }
    return '0';
  }

}
