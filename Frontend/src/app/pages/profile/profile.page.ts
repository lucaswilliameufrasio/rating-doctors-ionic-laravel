import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  logout() {

    this.authService.getToken().then(token => {

      let headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      });

      console.log(token);
      console.log(headers);
      this.http.post(environment.api_url + '/auth/logout', {}, {
        headers: headers,
      })
        .subscribe(res => {
          console.log(res);
          console.log(headers)
          if (res['success']) {
            alert("Saiu com sucesso.")
            this.authService.logout();
          } else {
            alert(res)
          }
        }, (error) => {
          console.log(error);
        });
    });
  }
}
