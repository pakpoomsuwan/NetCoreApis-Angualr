import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private networkService: NetworkService) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['/stock']);
    }
  }

  login(form: NgForm) {
    this.networkService.login(form.value).subscribe(
      data => {
        if (data.token !== '') {
          this.authService.login(data.token);
          this.router.navigate(['/stock']);
        } else {
          alert('Login Failure');
        }
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
}
