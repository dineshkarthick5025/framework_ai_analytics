import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  sidebarVisible: boolean = true;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
