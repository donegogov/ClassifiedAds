import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient, private authService: AuthService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle('Солидарност.мк');
    this.metaTagService.addTags([
      { name: 'description', content: 'Подари на некој што му е најпотребно и направи добро дело' },
      { property: 'og:title', content: 'Солидарност.мк' },
      { proprety: 'og:description', content: 'Подари на некој што му е најпотребно и направи добро дело' },
      { property: 'og:image', content: 'https://solidarnost.de/assets/img/facebook-og.jpg' },
      { property: 'og:url', content: 'https://solidarnost.de' },
      { name: 'twitter:card', content: 'https://solidarnost.de/assets/img/facebook-og.jpg' }
    ]);
   }

  showRegister() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
