import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  position = ['Admin', 'Cashier'];

  // DI
  constructor(private location: Location,private router: Router , private networkService: NetworkService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.networkService.register(form.value).subscribe(
      data => {
        this.router.navigate(["/login"]);
      },
      error =>{
        alert(JSON.stringify(error));
      }
    );
  }

  checkPasswordMatch(form: NgForm): boolean {
    const value = form.value;
    return value.password !== '' && value.password !== value.confirmpassword;
  }

  goBack() {
    this.location.back();
  }
}
