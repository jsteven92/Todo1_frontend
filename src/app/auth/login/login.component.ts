import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    username: [ localStorage.getItem('username') || 'admin' , [ Validators.required] ],
    password: ['admin', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {

  }

  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('username', this.loginForm.get('username').value );
        } else {
          localStorage.removeItem('username');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }


}
