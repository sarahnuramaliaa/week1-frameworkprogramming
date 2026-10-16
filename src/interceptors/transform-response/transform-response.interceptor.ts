import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable , map} from 'rxjs';


// definisikan terlebih dahulu formatnyaa

export interface StandarResponse<T>{
  success: boolean,
  message: string,
  statusCode: number,
  data: T


}


@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, StandarResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandarResponse<T>> {

    // update konten

    const httpContext = context.switchToHttp()
    const response = httpContext.getResponse()
    const currentStatusCode = response.statusCode

    return next.handle().pipe(
      map((originalData) => ({
      success: true,
      message: "Data berhsil diambil",
      statusCode: currentStatusCode,
      data: originalData 

    }))
    )
  }
}
