import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { PlaceFitnessTrainerAppointmentComponent } from '../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  backgroundImage = 'assets/backgroundImage.jpg'
  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  placeAppointment(){
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose= true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "70%";
    this.dialog.open(PlaceFitnessTrainerAppointmentComponent,{
      width : '50%',
      height:'90%',
      disableClose : true,
      data:{
        details : null
      }
    });
    
  }

}
