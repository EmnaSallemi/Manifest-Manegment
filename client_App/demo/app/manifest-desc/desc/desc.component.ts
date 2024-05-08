import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DescServiceService } from '../services/desc-service.service';
 
@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements OnInit {
  @Input() resourceName: string | null = null;
  @Input() resourceType: string | null = null;
 
  resourceDetails: { title: string, description: string }[] = [];
  errorMessage: string = '';
  isFrameOpen: boolean = false;
  private initialized: boolean = false;

  constructor(private descServiceService: DescServiceService) { }
  
  ngOnInit(): void {
    //console.log(this.resourceName);
    if (this.resourceName && this.resourceType) {
      this.getResourceDetails();
    }
    this.initialized = true;

  }
 
  closeFrame(): void {
    this.isFrameOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Resource Name!!!!!:', this.resourceName);
    // console.log('Resource Type:', this.resourceType);
  
    if (this.initialized && changes.resourceName && changes.resourceName.currentValue 
      && this.resourceType) {
      this.getResourceDetails();
    }
  }
  
  getResourceDetails(): void {
    if (!this.resourceType) {
        // Handle the case where resourceType is not defined
        console.error('Resource type is undefined.');
        this.errorMessage = 'Resource type is undefined.';
        return;
    }

    this.descServiceService.getResourceDescriptions(this.resourceType, this.resourceName)
        .subscribe(
            (description: string) => {
                this.parseResourceDescription(description);
            },
            (error: any) => {
                console.error('Error fetching resource details:', error);
                this.errorMessage = 'Error fetching resource details. Please try again later.';
            }
        );
}
 
  parseResourceDescription(description: string): void {
    const lines = description.split('\n');
  
    let parsedDetails: { title: string, description: string }[] = [];
    let currentTitle = '';
    let currentDescription = '';
  
    lines.forEach(line => {
      const [label, value] = line.split(':');
  
      if (label && value) {
        if (currentTitle && currentDescription) {
          parsedDetails.push({ title: currentTitle, description: currentDescription });
        }
        currentTitle = label.trim();
        currentDescription = value.trim();
      } else {
        currentDescription += '\n' + line.trim();
      }
    });
  
    if (currentTitle && currentDescription) {
      parsedDetails.push({ title: currentTitle, description: currentDescription });
    }
  
    this.resourceDetails = parsedDetails;
  }
  // parseResourceDescription(description: string): void {
  //   const lines = description.split('\n');
  //   this.resourceDetails = [];
  //   lines.forEach(line => {
  //     const [label, value] = line.split(':');
  //     if (label && value) {
  //       this.resourceDetails.push({ title: label.trim(), description: value.trim() });
  //     }
  //   });
  // }
 
}