import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, NgIcon],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private matDialog: MatDialog) {}

  openInfo() {
    this.matDialog.open(InfoComponent, { disableClose: false });
  }
}
