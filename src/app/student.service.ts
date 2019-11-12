import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor( public bc: HttpClient) { }

  saving(data):Observable <any>{
    return this.bc.post('/userapi/create',data)
  }
  // get data
  pass():Observable <any>{
    return this.bc.get('/userapi/test')
  }
  // delete method
  dele(de):Observable<any>{
    return this.bc.delete(`/userapi/delet ${de.password}`)
  }
  up(a):Observable<any>{
    return this.bc.put('/userapi/update',a)
  }

  log(value):Observable<any>
  {
    if(value.username=="anil"){
   return this.bc.post('/adminapi/login',value)
    }
    else{
      return this.bc.post('/userapi/login',value)
    }

  }
}

