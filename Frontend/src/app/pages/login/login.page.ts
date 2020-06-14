import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  login() {
    // this.authService.login(res['access_token']);

    let dados = { "email": this.email, "password": this.senha };
    console.log(dados);

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
    
    this.http.post(environment.api_url + '/auth/login', dados, { headers: headers })
      .subscribe(res => {
        console.log(res);
        if (res['success']) {
          alert("Logado com sucesso.")
          this.authService.login(res['access_token']);
        } else {
          alert("O email ou senha parecem estar errados.")
        }
      }, (error) => {
        console.log(error);
      });
  }
}
