import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public rs:StudentService) { }

  ngOnInit() {
  }
  arr:object[]=[];
  adding(){
    this.rs.pass().subscribe(res=>{
      if(res["message"]=="unsuccess"){
        alert("not success")
      }
      this.arr=res["message"]
    })
  }

  remove(index,s){
    this.arr.splice(index,1)
    this.rs.dele(s).subscribe(res=>{
      if(res["message"]=="success"){
        alert("delete success")
      }
    })

  }
  edit(w){
    this.rs.up(w).subscribe(res=>{
      if(res["message"]=="success"){
        alert("upload successfully")
      }
      if(res["message"]=="unsuccess"){
        alert("already existed")
      }
    })
  }

}
