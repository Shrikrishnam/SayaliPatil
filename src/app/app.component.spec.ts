import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// import * as fs from "fs";

// let writeTestResult = require("./../../test/write-test-results")

describe("AppComponent", () => {

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule,
          MatSidenavModule,
          MatToolbarModule,
          MatIconModule,
          MatListModule,
          BrowserAnimationsModule
        ],
        declarations: [AppComponent,
          
        ]
      }).compileComponents();
    }));

    describe("boundary", ()=>{

      it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
    });
    
  })