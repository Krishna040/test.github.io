import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public rs:StudentService, public log:Router) { }

  ngOnInit() {
  }
  add(value){
    this.rs.saving(value).subscribe(res=>{
      if(res["message"]=="success"){
        alert("upload success")
        this.log.navigate(["login"])
      }
      if(res["message"]=="unsuccess"){
        alert("already existed")
      }
    })

    
  }
// get
  // arr:object[]=[];
  // adding(){
  //   this.rs.pass().subscribe(res=>{
  //     if(res["message"]=="unsuccess"){
  //       alert("not success")
  //     }
  //     this.arr=res["message"]
  //   })
  // }

  // remove(index,s){
  //   this.arr.splice(index,1)
  //   this.rs.dele(s).subscribe(res=>{
  //     if(res["message"]=="success"){
  //       alert("delete success")
  //     }
  //   })

  // }
  // edit(w){
  //   this.rs.up(w).subscribe(res=>{
  //     if(res["message"]=="success"){
  //       alert("upload successfully")
  //     }
  //   })
  // }

}
