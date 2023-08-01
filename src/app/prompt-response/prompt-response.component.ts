import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prompt-response',
  templateUrl: './prompt-response.component.html',
  styleUrls: ['./prompt-response.component.scss']
})
export class PromptResponseComponent {
  @Input()
  promptResponse: string = '';

}
