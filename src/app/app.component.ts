import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms'
import { MyValidators } from './my.validators'

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   form: FormGroup

   constructor(private fb: FormBuilder) { }

   ngOnInit() {
      this.form = this.fb.group({
         email: ['', [Validators.required, Validators.email, MyValidators.restrictedEmails], [MyValidators.uniqEmail]],
         address: this.fb.group({
            city: { value: '', disabled: true },
            country: ['']
         }),
         skills: this.fb.array([this.createSkillsControl()])
      })

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
      return this.fb.control('')
   }

   // for FormArray how have formGroupse
   // createSkillsControl() {
   //    return this.fb.group({
   //       name: [''],
   //       skill: ['']
   //    })
   // }

   get skillsArray() {
      return this.form.get('skills') as FormArray
   }

   addSkill() {
      this.skillsArray.push(this.createSkillsControl())

      this.form.patchValue({
         email: 'samo@mail.ru'
      })

      this.form.get('email').valueChanges.subscribe(e => {
         console.log(e)
      })
   }

   // submit(f: NgForm) {
   //    console.log(f)
   // }

   submit() {
      console.log(this.form)

      this.form.reset()
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
