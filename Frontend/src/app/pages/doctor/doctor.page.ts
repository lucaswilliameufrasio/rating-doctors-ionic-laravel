import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  doctors: any;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.getDoctors();
  }

  getDoctors(){
    return this.authService.getToken().then(token => {
  
      let headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      });

      this.http.get(environment.api_url + '/doctor', {
        headers: headers,
      }).subscribe(res => {
        console.log(res["data"]);
        this.doctors = res["data"];
      }, (error) => {
        console.log(error);
      })
    });
  }

  
}
