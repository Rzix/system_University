import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TUITION } from './constants/token.constant';
import { CurrencyService } from './currency.service';

@Module({})
export class CurrencyModule {
 static forRoot(full:boolean): DynamicModule{ 
   return {
     module: CurrencyModule,
     imports:[ConfigModule],
     exports:[TUITION],
     providers: [CurrencyService, {
      provide:TUITION, //شهریه
      useFactory:async (currencyService:CurrencyService)=>{
        
          return currencyService.Get_MY_Tuition(process.env.CURRENCY,full)
        },
        inject:[CurrencyService]
      },]
   }
 }
}

