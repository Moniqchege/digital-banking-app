// // src/app/core/interceptors/token.interceptor.ts
// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { UserService } from '../services/user.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private userService: UserService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.userService.getToken();
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next.handle(cloned);
//     }
//     return next.handle(req);
//   }
// }
