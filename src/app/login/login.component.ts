import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public bc:StudentService, public log:Router) { }

  ngOnInit() {
  }
  call(login){
    this.bc.log(login).subscribe(res=>{
      if(res['message']=="success"){
        alert("login successfully")
        this.log.navigate(["dashboard"])
      }
      if(res['message']=="unsuccess"){
        alert("invalid username")
      }
      if(res['message']=="invalid password"){
  
        alert("invalid password")
      }
      if(res['message']=="supersuccess"){
        alert("admin loggedd in")
        // this.log.navigate(["admindash"])
      }
    })
    
  }

}
