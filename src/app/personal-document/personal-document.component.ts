import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesizePipe } from '../filesize.pipe';

@Component({
  selector: 'app-personal-document',
  templateUrl: './personal-document.component.html',
  styleUrls: ['./personal-document.component.scss']
})
export class PersonalDocumentComponent {
  uploadedFiles: File[] = [];

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files || [];
    this.handleFiles(Array.from(files));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.handleFiles(files);
    }
  }

  handleFiles(files: File[]): void {
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }
}
