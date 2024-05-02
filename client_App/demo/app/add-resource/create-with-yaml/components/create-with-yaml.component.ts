import { Component } from '@angular/core';
import { CreateWithYamlService } from '../services/create-with-yaml.service';

@Component({
  selector: 'app-create-with-yaml',
  templateUrl: './create-with-yaml.component.html',
  styleUrls: ['./create-with-yaml.component.scss']
})
export class CreateWithYamlComponent {

  constructor(private createWithYamlService: CreateWithYamlService) { }

  onSubmit() {
    const fileInput = document.getElementById('fileInputAlt') as HTMLInputElement;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const yamlContent = reader.result as string;
        this.sendYamlToBackend(yamlContent); 
      };
      reader.readAsText(file);
    }
  }

  private sendYamlToBackend(yamlContent: string) {
    this.createWithYamlService.addResource(yamlContent).subscribe(
      response => {
        console.log('Resource added successfully:', response);
      },
      error => {
        console.error('Error adding resource:', error);
      }
    );
  }
}
