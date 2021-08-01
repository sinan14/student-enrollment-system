import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

ngOnInit(){
}

  title = 'ProductManagement';
  constructor(public _auth: AuthService, private _router: Router, private router:RouterModule) {}
  logoutUser() {
    this._auth.logOut()
    // Swal.fire('we will miss you').then(() => {
    //   this._router.navigate(['/login']);
    // });
  }
  loggedUser() {
    this._router.navigate(['/books']);
  }

  hero(){
    document.getElementById("hero").scrollIntoView();
  }
  
  about(){
    document.getElementById("about").scrollIntoView();
  }
  courses(){
    document.getElementById("courses").scrollIntoView();
  }
  gallery(){
    document.getElementById("gallery").scrollIntoView();
  }
  team(){
    document.getElementById("team").scrollIntoView();
  }
  contact(){
    document.getElementById("contact").scrollIntoView();
  }

}

