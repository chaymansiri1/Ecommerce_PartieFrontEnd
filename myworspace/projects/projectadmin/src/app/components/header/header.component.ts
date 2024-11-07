import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { Provider } from '../../models/provider';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  provider!: Provider;

  constructor(private Auth: AuthentificationService,private router:Router) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user')!);
    if (userId) {
      this.Auth.getUserById(userId.id).subscribe(data => {
        this.provider = data;
        console.log("image provider",data);
      });
    }
  }
  onLogout(): void {
    this.Auth.logout(); 
    this.router.navigate(['/']);
  }
}
