import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MyValidators } from "./my.validators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        "",
        [Validators.required, Validators.email, MyValidators.restrictedEmails],
        [MyValidators.uniqEmail],
      ],
      address: this.fb.group({
        city: { value: "", disabled: true },
        country: [""],
      }),
      skills: this.fb.array([this.createSkillsControl()]),
    });

    // this.form = new FormGroup({
    //    email: new FormControl({
    //       value: '',
    //       disabled: true
    //    }, [Validators.required, Validators.email, MyValidators.restrictedEmails], [MyValidators.uniqEmail]),
    //    address: new FormGroup({
    //       city: new FormControl({ value: '' }),
    //       country: new FormControl({ value: '' })
    //    }),
    //    skills: this.fb.array([this.createSkillsControl()])
    // })
  }

  createSkillsControl() {
    return this.fb.control("");
  }

  // for FormArray how have formGroupse
  // createSkillsControl() {
  //    return this.fb.group({
  //       name: [''],
  //       skill: ['']
  //    })
  // }

  get skillsArray() {
    return this.form.get("skills") as FormArray;
  }

  addSkill() {
    this.skillsArray.push(this.createSkillsControl());

    this.form.patchValue({
      email: "samo@mail.ru",
    });

    this.form.get("email").valueChanges.subscribe((e) => {
      console.log(e);
    });
  }

  // submit(f: NgForm) {
  //    console.log(f)
  // }

  submit() {
    console.log(this.form);

    this.form.reset();
  }
}

//----------http requests and reportProgress----------

// import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class UploadService {
//   private _logoUploader: any;
//   private _reviewPhotoUploader: any;
//   private _documentUploader: any;

//   onValidate = new EventEmitter<any>();
//   onValidateBatch = new EventEmitter<any>();
//   onStart = new EventEmitter<any>();
//   onProgress = new EventEmitter<any>();
//   onUploaded = new EventEmitter<any>();
//   onAllUploaded = new EventEmitter<any>();
//   onError = new EventEmitter<any>();

//    constructor(
//      private http: HttpClient
//    ) { }

//   uploadBlogSubmissionPackage(file: File): Observable<HttpEvent<any>> {
//     const formData = new FormData();
//     formData.append('file', file, file.name);

//     return this.http.post('blogImages', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).pipe(
//       catchError(this.onUploadError)
//     );
//   }

//   uploadLogo(file: File, sessionId: string = null): Observable<HttpEvent<any>> {
//     const formData = new FormData();
//     formData.append('file', file, file.name);
//     if (sessionId) {
//       formData.append('sessionId', sessionId);
//     }

//     return this.http.post('logo', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).pipe(
//       catchError(this.onUploadError)
//     );
//   }

//   uploadPhoto(file: File, sessionId: string = null): Observable<HttpEvent<any>> {
//     const formData = new FormData();
//     formData.append('file', file, file.name);
//     if (sessionId) {
//       formData.append('sessionId', sessionId);
//     }

//     return this.http.post('photo', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).pipe(
//       catchError(this.onUploadError)
//     );
//   }

//   uploadFloorPlan(file: File, sessionId: string = null): Observable<HttpEvent<any>> {
//     const formData = new FormData();
//     formData.append('file', file, file.name);
//     if (sessionId) {
//       formData.append('sessionId', sessionId);
//     }

//     return this.http.post('floorPlan', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).pipe(
//       catchError(this.onUploadError)
//     );
//   }

//   private onUploadError(error: HttpErrorResponse) {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       // Get client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Get server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }

//     return throwError(errorMessage);
//   }
// }

//----------http requests and reportProgress----------

// ------------Custom Validator-----------------
// import { Directive } from '@angular/core';
// import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

// @Directive({
//   selector: '[emailvalidator][ngModel]',
//   providers: [
//     {
//      provide: NG_VALIDATORS,
//      useExisting: EmailValidator,
//      multi: true
//     }
//    ]
// })

// export class EmailValidator implements Validator {
//   constructor() { }

//   validate(c: AbstractControl): { [key: string]: any } {
//       if (!c.value && c.errors && !c.errors.required) {
//         return null;
//       }

//       const validate =
//         /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+(\)0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+(\)0-9=?A-Z^_`a-z{|}~]+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/g
//         .test(c.value);
//       return (validate)
//         ? null
//         : { email: c.value };
//   }
// }
// ------------Custom Validator-----------------

// --------------Intercepter-----------------
// import { Injectable, Inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { SnotifyService } from 'ng-snotify';

// import { IAppConfig } from 'common-lib';

// @Injectable({providedIn: 'root'})
// export class AuthInterceptor implements HttpInterceptor {
//   private _config;
//   constructor(private router: Router,
//     @Inject('config') config: IAppConfig,
//     private snotifySvc: SnotifyService) {
//       this._config = config;
//     }

//   private handleAuthError(err: HttpErrorResponse): Observable<any> {
//     if (err.status === 401) {
//       window.location.href = this._config.Host + this._config.ReturnUrl
//         + window.location.pathname
//         + window.location.search.replace('?', '%3F')
//         + window.location.hash.replace('#', '%23');
//     }

//     if (err.status === 403) {
//       this.router.navigate(['']);
//     }

//     if (err.status === 500) {
//       this.snotifySvc.error(
//         'Please let us know about this error or try again later',
//         'Server Error',
//         { timeout: 10000 });
//     }

//     return throwError(err);
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const apiAuth: HttpRequest<any> = req.clone({
//       headers: req.headers.set('x-api-token', 'Jnsdi7uJ87%2')
//     });

//     return next.handle(apiAuth)
//       .pipe(catchError(err => this.handleAuthError(err)));
//   }
// }

// add into module
// providers: [
//    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
// ]
// --------------Intercepter-----------------

// --------------Guard-----------------
// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// import { AccountService } from 'common-lib';

// @Injectable()
// export class UserGuard implements CanActivate, CanActivateChild {

//   constructor(private accountSvc: AccountService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
//     return this.accountSvc.checkUser();
//   }

//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
//     return this.accountSvc.checkUser();
//   }
// }
// --------------Guard-----------------
