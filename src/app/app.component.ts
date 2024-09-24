import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BuilderContent,
  fetchOneEntry,
  Content,
} from '@builder.io/sdk-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <div>
    @if (content) {
    <content-variants
      [model]="model"
      [content]="content"
      [apiKey]="apiKey"
    ></content-variants>
    }
  </div>`,
  imports: [RouterOutlet, Content],
})
export class AppComponent {
  apiKey = 'ad30f9a246614faaa6a03374f83554c9';
  model = 'page';
  content: BuilderContent | null = null;

  async ngOnInit() {
    const urlPath = window.location.pathname || '';

    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: {
        urlPath: '/angular-123',
      },
    });

    if (!content) {
      return;
    }

    this.content = content;
  }
}
