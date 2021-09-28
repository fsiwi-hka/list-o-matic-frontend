import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey;

  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    this.userService.login(username, password).subscribe({
      next: _ => {
        console.log('LOGIN OK.');
      },
      error: _ => {
        console.log('LOGIN FAILED.');
      }
    });
  }

}
