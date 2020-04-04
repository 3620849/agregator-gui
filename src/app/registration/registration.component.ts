import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { UserData } from '../shared/model/userData';
import { LoginService } from '../login/login.service';
import { StorageService } from '../shared/services/storage.service';
import { Constants } from '../shared/constants';
import { error } from 'protractor';
import { TokenType } from '../shared/model/tokenType';
import { Token } from '../shared/model/token';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  status: string = "form";
  failMessage: string = "error"
  @ViewChild("pass")
  inp: ElementRef;
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<RegistrationComponent>,
    private regService: RegistrationService,
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private storage: StorageService, ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mail: [, []],
      password: [, []]
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  visible() {
    if (this.inp.nativeElement.type === "password") {
      this.inp.nativeElement.type = "text"
    } else {
      this.inp.nativeElement.type = "password"
    };
  }
  create() {
    this.status = 'progress';
    let credentials = new UserData(this.form.getRawValue()["mail"], this.form.getRawValue()["password"]);
    this.regService.createNewUser(credentials).subscribe(res => {
      this.loginService.sendCredentials(credentials).subscribe(loginResponse => {
        this.storage.updateToken(new Token(loginResponse.headers.get(TokenType.X_TOKEN),true,TokenType.X_TOKEN));
        this.storage.startKeepAlive();
        this.status = 'success'
        setTimeout(() => { this.dialogRef.close(); }, 3000);
      }, error => {
        console.log("err",error);
        this.status = 'fail';
        if (error.error && error.error.message) {
          this.failMessage = error.error.message;
        }
        setTimeout(() => { this.status = 'form'; }, 3000);
      })
    }, error => {
      this.status = 'fail';
        if (error.error && error.error.message) {
          this.failMessage = error.error.message;
        }
        setTimeout(() => { this.status = 'form'; }, 3000);
    })
  }
}
