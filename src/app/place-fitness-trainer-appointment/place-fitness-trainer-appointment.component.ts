import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Fitness } from 'src/Fitness';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls: ['./place-fitness-trainer-appointment.component.css']
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {


  
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;

  fitnessForm: FormGroup;
  dataNew: Fitness[];
  dict = {}

  buttonName:string ="Submit"
  ishidden = true

  value= null
  el: any;

  

  constructor(public dialogRef : MatDialogRef<PlaceFitnessTrainerAppointmentComponent>,
    private appointmentDataService : UserService,
    private _formBuilder: FormBuilder,
    private router : Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataMat
    ) { }

  

  ngOnInit(): void {

    

    this.fitnessForm = this._formBuilder.group({
      firstname: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      lastname: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      age: ['', [Validators.required,Validators.max(65),Validators.min(18)]],
      email: ['', [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      phonenumber: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      streetaddress: ["",[Validators.required]],
      city : ["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      state : ["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      country : ["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      pincode : ["",[Validators.required,Validators.pattern("^[0-9]{6}$")]],
      trainerpreference: ["",[Validators.required]],
      physiotherapist : ["",[Validators.required]],
      packages : ["",[Validators.required]],
      inr : ["",[Validators.required]],
      paisa : ["",[Validators.required]]

    });
    // this.fitnessForm = this._formBuilder.group({
    //   streetaddress: ["",[Validators.required]],
    //   city : ["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
    //   state : ["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
    //   country : ["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
    //   pincode : ["",[Validators.required,Validators.pattern("^[0-9]{6}$")]]
    // });
    // this.fitnessForm = this._formBuilder.group({
    //   trainerpreference: ["",[Validators.required]],
    //   physiotherapist : ["",[Validators.required]],
    //   packages : ["",[Validators.required]],
    //   inr : ["",[Validators.required]],
    //   paisa : ["",[Validators.required]]
    // });

    this.fitnessForm.get('physiotherapist').setValue('yes')
    this.fitnessForm.get('packages').valueChanges.subscribe(val =>{
      const cost = (Number( this.fitnessForm.controls.packages.value) *10)/100
      this.fitnessForm.get('inr').setValue(cost + Number( this.fitnessForm.controls.packages.value)  )
      this.fitnessForm.get('paisa').setValue(.50)
    })




    console.log(this.dataMat.details)
    if (this.dataMat.details != null) {
      this.appointmentDataService.getAppointmentDetails(this.dataMat.details).subscribe(data =>  {
        for(var val in data){
          this.dict[val] = data[val]
        }
        this.fitnessForm.get('firstname').setValue(this.dict['firstname'])
        this.fitnessForm.get('lastname').setValue(this.dict['lastname'])
        this.fitnessForm.get('age').setValue(this.dict['age'])
        this.fitnessForm.get('email').setValue(this.dict['email'])
        this.fitnessForm.get('phonenumber').setValue(this.dict['phonenumber'])

        this.fitnessForm.get('streetaddress').setValue(this.dict['streetaddress'])
        this.fitnessForm.get('city').setValue(this.dict['city'])
        this.fitnessForm.get('country').setValue(this.dict['country'])
        this.fitnessForm.get('state').setValue(this.dict['state'])
        this.fitnessForm.get('pincode').setValue(this.dict['pincode'])

        this.fitnessForm.get('trainerpreference').setValue((this.dict['trainerpreference']))
        this.fitnessForm.get('physiotherapist').setValue(this.dict['physiotherapist'])
        this.fitnessForm.get('packages').setValue(this.dict['packages'])
        this.fitnessForm.get('inr').setValue(this.dict['inr'])
        this.fitnessForm.get('paisa').setValue(this.dict['paisa'])


        this.buttonName = 'Edit'


      }) 
    }
  }

  //Selected Value
  selected = 'None';

  onSubmit(){   
    // this.fitnessForm.get('inr').setValue( this.fitnessForm.controls.packages.value)
    // this.fitnessForm.get('paisa').setValue( this.fitnessForm.controls.packages.value)
    if(this.fitnessForm.valid){
    const result = Object.assign({}, this.fitnessForm.value, this.fitnessForm.value,this.fitnessForm.getRawValue());
    // const result = Object.assign({}, this.fitnessForm.value, this.secondFormGroup.value,this.thirdFormGroup.getRawValue());
   
    var appointment = new Fitness(
      result.firstname,
      result.lastname,
      result.age,
      result.phonenumber,
      result.email,
      result.streetaddress,
      result.city,
      result.state,
      result.country,
      result.pincode,
      result.trainerpreference,
      result.physiotherapist,
      result.packages,
      result.inr,
      result.paisa,
      null
    )
    
    if (this.dataMat.details == null) {

      this.appointmentDataService.postfitnessdata(appointment).subscribe(
        data=> {
          this.dataNew = data
        }
      )
      this.snackBar.open("Appointment Added Successfully","" ,{
        duration: 2000,
      });
      this.router.navigate(['landing-page'])
     
      this.dialogRef.close()

    }else{
        this.appointmentDataService.putFitnessData(appointment,this.dataMat.details).subscribe(
          data =>{
            console.log(data)
          }
        )
        this.snackBar.open("Appointment Updated Successfully","" ,{
          duration: 2000,
        });
        parent.location.reload();

        // this.dialogRef.close()
        // this.router.navigate(['landing-page'])
    }
    
  }else{
    alert("Invalid Credentials")
    console.log(this.fitnessForm.invalid)
  }
  }  
}
