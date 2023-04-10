import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  mode = 'dark_mode';

  toggleMode() {
    if (this.mode === 'dark_mode') {
      this.mode = 'light_mode';
      document.body.classList.add('dark-mode');
    } else {
      this.mode = 'dark_mode';
      document.body.classList.remove('dark-mode');
    }
  }
}
