import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { AiService } from '../../services/ai.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [NgIcon, CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  aiForm: FormGroup;
  image: string | null = null;
  loading: boolean = false;
  isPromptOpen: boolean = false;
  data: any;

  constructor(private fb: FormBuilder, private aiService: AiService) {
    this.aiForm = this.fb.group({
      message: [''],
      image: [''],
    });
  }

  sendPrompt() {
    if (this.aiForm.invalid) return;
    this.loading = true;
    const { message, image } = this.aiForm.value;

    this.aiService.sendPrompt(message, image).subscribe({
      next: (data: any) => {
        this.data = data;
        console.log(data);
        this.loading = false;
        this.setPromptOpen(false);
      },
      error: (data: any) => {
        this.loading = false;
      },
    });
  }

  setPromptOpen(value: boolean) {
    this.isPromptOpen = value;
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.image = image.dataUrl!;
    this.aiForm.patchValue({ image: this.image });
    this.setPromptOpen(true);
  }

  writePrompt() {
    this.setPromptOpen(true);
  }

  cancel() {
    this.image = null;
    this.aiForm.reset();
    this.setPromptOpen(false);
  }
}
