import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  modalRef?: BsModalRef;
  imageSrc: string = '/assets/images/person.jpg';

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template)
  }

  updateImage(event: any): void {
    if (event === undefined) return;
    if (event.target === undefined) return;
    
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => this.imageSrc = reader.result as string;

        reader.readAsDataURL(file);
    }
}

}
