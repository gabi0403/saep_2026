import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, retryWhen, mergeMap, finalize } from 'rxjs/operators';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {
  
  private maxRetries = 3;
  private delayMs = 1000;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      
      // Retry automático com backoff exponencial
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            // Não retry em erros 4xx (exceto 503, 504)
            if (error instanceof HttpErrorResponse && 
                error.status >= 400 && 
                error.status < 500 &&
                error.status !== 503 &&
                error.status !== 504) {
              return throwError(() => error);
            }

            // Limite de retries
            if (index >= this.maxRetries) {
              return throwError(() => error);
            }

            // Backoff exponencial: 1s, 2s, 4s
            const delayTime = this.delayMs * Math.pow(2, index);
            
            console.warn(
              `⚠️ Requisição falhou. Tentando novamente em ${delayTime}ms... (${index + 1}/${this.maxRetries})`
            );

            return timer(delayTime);
          })
        )
      ),

      // Tratamento de erros finais
      catchError((error: HttpErrorResponse) => {
        
        console.error('❌ Erro na requisição após retries:', error);

        // Erro de conexão/servidor
        if (error.status === 0 || error.status >= 500) {
          return throwError(() => ({
            status: error.status || 0,
            mensagem: 'Erro de conexão com o servidor. Tente novamente.',
            erro: error.message
          }));
        }

        return throwError(() => error);
      })
    );
  }
}
