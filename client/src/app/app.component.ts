import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  radixCamera,
  radixImage,
  radixFile,
  radixDoubleArrowRight,
} from '@ng-icons/radix-icons';
import { phosphorArrowFatUpDuotone } from '@ng-icons/phosphor-icons/duotone';
import { phosphorInfo } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  viewProviders: [
    provideIcons({
      radixCamera,
      radixImage,
      radixFile,
      radixDoubleArrowRight,
      phosphorArrowFatUpDuotone,
      phosphorInfo,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
