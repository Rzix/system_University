import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
export enum TranslateFielsEnum{
    Banner='Banner'
}
const Farsi={
    [TranslateFielsEnum.Banner]:'دانشگاه آزاد اسلامی'
}

const English={
    [TranslateFielsEnum.Banner]:'Islamic Azad university'
}
@Injectable({
    scope:Scope.REQUEST
})
export class TranslateService {
    constructor(@Inject(REQUEST) private readonly request:Request){}
    translate(input:TranslateFielsEnum){
        const language= this.request.headers['Accept-Language']
        switch (language) {
            case 'En':
                return English[input]
                
            case 'Fa':
                return Farsi[input]
            default:
                break;
        }
    }
}
