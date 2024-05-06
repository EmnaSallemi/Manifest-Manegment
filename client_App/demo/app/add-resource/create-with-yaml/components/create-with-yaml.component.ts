import { Component } from '@angular/core';
import { CreateWithYamlService } from '../services/create-with-yaml.service';

@Component({
  selector: 'app-create-with-yaml',
  templateUrl: './create-with-yaml.component.html',
  styleUrls: ['./create-with-yaml.component.scss']
})
export class CreateWithYamlComponent {
  successMessage: string;

  constructor(private createWithYamlService: CreateWithYamlService) { }

  onSubmit() {
    const fileInput = document.getElementById('fileInputAlt') as HTMLInputElement;
    const file = fileInput.files[0];
    if (file) {
      this.sendYamlToBackend(file); 
    }
  }

  private sendYamlToBackend(file: File) {
    const formData = new FormData();
    formData.append('yamlFile', file); 

    this.createWithYamlService.addResource(formData).subscribe(
      response => {
        this.successMessage = 'Resource added successfully';
        console.log('Resource added successfully:', response);
      },
      error => {
        console.error('Error adding resource:', error);
      }
    );
  }
}
