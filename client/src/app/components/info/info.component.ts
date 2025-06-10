import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [RouterModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  media = [
    {
      icon: '👨🏾‍💻',
      name: 'Código',
      link: 'https://github.com/will9191/lixo-no-lixo',
    },
    {
      icon: '🌐',
      name: 'Documentação',
      link: 'https://docs.google.com/document/d/1iu69MHVu1rvwq-kDHn7lEbHBnSJG-FUmwnDNVxz3onc/edit?tab=t.0#heading=h.kmhida9fmlm4',
    },
  ];
}
