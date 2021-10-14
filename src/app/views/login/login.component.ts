import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey;

  /**
   * This will emit an event when a login attempt has succeeded
   */
  @Output() loginOk = new EventEmitter<void>();

  /**
   * Input form group for the login form
   */
  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Do the login process
   */
  doLogin(): void {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    this.userService.login(username, password).subscribe({
      next: _ => {
        this.loginOk.emit();
        this.toastr.success("Logged in successfully.");
      },
      error: _ => {
        this.toastr.error("Invalid credentials.");
      }
    });
  }

}
