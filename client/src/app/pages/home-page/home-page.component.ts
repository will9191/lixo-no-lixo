import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [NgIcon, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private dialog: MatDialog) {}

  photo: string | null = null;

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.photo = image.dataUrl!;
    this.selectionOpen = false;
  }

  openSelection() {
    this.selectionOpen = !this.selectionOpen;
  }

  selectionOpen: boolean = false;

  search() {
    console.log('search');
  }

  remove() {
    this.photo = null;
  }
}
