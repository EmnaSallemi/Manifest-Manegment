import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yml-file',
  templateUrl: './yml-file.component.html',
  styleUrls: ['./yml-file.component.scss']
})
export class YmlFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fileName!: string;
  http: any;


  OnChangeFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
  
    if (files && files.length > 0) {
      const file: File = files[0];
      this.fileName = file.name;
  
      const formData = new FormData();
      formData.append("thumbnail", file);
  
      const upload$ = this.http.post("/api/thumbnail-upload", formData);
      upload$.subscribe();
    }
  }
  

  manifestList: string[] = ['Pod', 'Deployment', 'ReplicaSet', 'Service', 'StatefulSet','ConfigMap', 'DeamonSet'];

  selectedManifest: string = '';
  manifestData: any;
}
