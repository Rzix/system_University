import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT //برای اینکه در هر وابستی یک لاگ خاص بیوفته(جلو گیری از قاعده سینگلتون)
})
export class LoggerService {
    private prifix:string;
    log(input:string){
        console.log(`[${this.prifix}]`,input);    
    }
    Setprifix(_prifix:string){
        this.prifix=_prifix;
    }
}
