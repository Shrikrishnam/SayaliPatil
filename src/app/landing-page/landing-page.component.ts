import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  imageUrl = 'assets/fitnessTrainer.png'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navpage() {
    this.router.navigateByUrl("place-gift-card-order-page");
  }
  
}
