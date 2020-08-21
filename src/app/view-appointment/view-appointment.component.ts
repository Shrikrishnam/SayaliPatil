import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Observable';
import { Fitness } from 'src/Fitness';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaceFitnessTrainerAppointmentComponent } from '../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls : ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name','Address','City','Package','trainerpreference',
  'Phone','edit'];

public appointmentData : Fitness[] = []
public dataSource ;
public appointment : Fitness;

display = false

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


@Input()
result$: Observable<Fitness[]>;
passData: Fitness[];
str:string = ""

constructor(private appointmentDataService : UserService,
  private dialog : MatDialog,
  private router: Router,
  private snackBar: MatSnackBar
  
  ) { }  

ngOnInit() {
  this.getfitness()
  console.log(this.appointmentData.length)
  } 

  public getfitness() {
    this.appointmentData = []
    this.appointmentDataService.getfitnessData().subscribe(data =>  {
      data.forEach(value => {this.appointmentData.push(value)
      //console.log(value) 
      })

      this.dataSource = new MatTableDataSource<Fitness>(this.appointmentData),
      //this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.appointmentData.length)
    })
  
}

viewDialog(element: any){
  const dialogConfig = new MatDialogConfig();
 //  dialogConfig.disableClose= true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "50%";
  dialogConfig.height = "40%";
  this.dialog.open(PlaceFitnessTrainerAppointmentComponent,{
    disableClose : false,
    width : '50%',
    height:'90%',
    data:{
      details : element.id
    }
  });   
}

deleteAppointment(element: Fitness){

  console.log("Delete")
  this.appointmentDataService.deleteFitnessData(element.id).subscribe(data => {
   console.log("successfully deleted")
   this.ngOnInit();
  })

  

  this.snackBar.open("Appointment Deleted Successfully","" ,{
    duration: 2000,
  });
  
}

}

