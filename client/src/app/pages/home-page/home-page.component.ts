import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { AiService } from '../../services/ai.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoldMarkdownPipe } from '../../pipes/bold-markdown.pipe';

interface IMessage {
  part: string;
  isUser: boolean;
  image: string | null;
}

@Component({
  selector: 'app-home-page',
  imports: [NgIcon, CommonModule, ReactiveFormsModule, BoldMarkdownPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  aiForm: FormGroup;
  image: string | null = null;
  loading: boolean = false;
  isPromptOpen: boolean = false;
  responses: IMessage[] = [];

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

    const userMessage: IMessage = {
      part: message,
      isUser: true,
      image: image,
    };

    this.aiService.sendPrompt(message, image).subscribe({
      next: (data: any) => {
        this.responses.push(userMessage);
        this.setResponse(data);
        this.loading = false;
        this.setPromptOpen(false);
        this.image = null;
        this.aiForm.reset({
          message: '',
          image: null,
        });
        this.image = null;
      },
      error: (data: any) => {
        this.loading = false;
      },
    });
  }

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  async setResponse(data: any = { response: '' }) {
    const parts = data.message.split('\n\n');

    for (const part of parts) {
      const message: IMessage = {
        part: part,
        isUser: false,
        image: null,
      };
      this.responses.push(message);
      this.scrollToBottom();

      await this.delay(2000);
    }
  }

  private scrollToBottom() {
    requestAnimationFrame(() => {
      try {
        this.scrollContainer.nativeElement.scrollTo({
          top: this.scrollContainer.nativeElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (err) {}
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
    this.aiForm.reset({
      message: '',
      image: null,
    });
    this.setPromptOpen(false);
  }
}
