import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-component-one',
   templateUrl: './component-one.component.html',
   styleUrls: ['./component-one.component.scss']
})
export class ComponentOneComponent implements OnInit {

   form: FormGroup

   data: any;

   constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router) { }

   ngOnInit() {
      this.form = this.fb.group({
         email: ['', [Validators.required, Validators.email]],
         address: this.fb.group({
            city: { value: '', disabled: true },
            country: ['']
         }),
         skills: this.fb.array([this.createSkillsControl()])
      })

      this.activatedroute.data.subscribe(data => {
         this.data = data;
      })

      console.log(this.router)

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

      this.router.navigateByUrl('/com2', { state: { form: this.form.value } });

      this.form.reset()
   }

}
