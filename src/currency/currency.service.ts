import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  Get_MY_Tuition(value: string, full: boolean): any {
      let sign=''
        switch (value) {
            case 'dollar':
              sign='$';
              case 'rial':
                sign = '﷼';
                break;
            default:
              sign= '﷼';
              break;
    }
    
    return full ? `${sign} ${value}` : sign;
  }
}
