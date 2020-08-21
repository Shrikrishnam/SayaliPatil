import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fitness } from '../../Fitness';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  public readonly url = "http://localhost:6565/";

  constructor(private http: HttpClient) { }
  
  getfitnessData(): Observable<Fitness[]>{

    console.log('Request is sent!');  
    return this.http.get<Fitness[]>(this.url+"allfriends")
  
  }
  
  getAppointmentDetails(id: number): Observable<Fitness[]>{
    console.log('Request is sent!');  
    return this.http.get<Fitness[]>(this.url+"allfriends"+"/"+id)
  
  }

  getDetails(name: string): Observable<Fitness[]>{
    console.log('Request is sent!');  
    return this.http.get<Fitness[]>(this.url+"allfriends"+"/"+name)
  
  }
  
  //Updates the record
  
  putFitnessData(fitness : Fitness,id): Observable<any> {
    console.log(id)
    return this.http.put(this.url+"allfriends"+"/"+id, fitness)
  }
  
  //deleteAppointment
  
  deleteFitnessData(id : number): Observable<any>{
    console.log("Deleting Appointment")
    return this.http.delete(this.url+"allfriends"+"/"+id)
  }
  
  postfitnessdata(fitness : Fitness): Observable<any> {
    return this.http.post(this.url+"allfriends", fitness)
  }
  
  postContactUs(contactus): Observable<any>{
    return this.http.post(this.url+"contactus", contactus)
  }

}