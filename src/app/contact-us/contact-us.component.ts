import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls : ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  dataNew: Contact;
  constructor(private fb: FormBuilder,
    private appointmentDataService : UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      lastname: ["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      phonenumber: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );

    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
      this.appointmentDataService.postContactUs(this.contactForm.value).subscribe(
        data=> {
          this.dataNew = data
        })
      
      this.snackBar.open("Submitted Successfully","" ,{
        duration: 2000,
      });
      this.contactForm.reset()
      Object.keys(this.contactForm.controls).forEach(key =>{
        this.contactForm.controls[key].setErrors(null)
      })
    }
    else{
      if(this.contactForm.get('firstname').invalid && this.contactForm.get('lastname').invalid
        && this.contactForm.get('email').invalid &&this.contactForm.get('message').invalid
        && this.contactForm.get('phonenumber').invalid
        )
        {
          alert( "Please fill the form");
        }
        else{
          if(this.contactForm.get('firstname').invalid)
          {
            alert('Please enter a valid First Name')
            this.contactForm.get('firstname').setValue('')
          }
          else{
            if(this.contactForm.get('lastname').invalid)
            {
              alert('Please enter a valid Last Name')
              this.contactForm.get('lastname').setValue('')
            }else{
              if(this.contactForm.get('phonenumber').invalid)
              {
                alert('Please enter a valid Phone Number')
                this.contactForm.get('phonenumber').setValue('')
              }
              else{
                if(this.contactForm.get('message').invalid)
                {
                  alert('Message Empty \n Please Mention your concern')
                  this.contactForm.get('message').setValue('')
                }
                else{
                  if(this.contactForm.get('email').invalid)
                  {
                    alert('Please enter a valid Email ID')
                    this.contactForm.get('email').setValue('')
                  }
                }
              }         
            }
          }
        }
    } 
  }
}
