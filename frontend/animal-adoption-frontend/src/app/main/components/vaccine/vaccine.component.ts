import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { VaccineModel } from 'src/app/shared/models/vaccine-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.less']
})
export class VaccineComponent implements OnInit {
  @Input()
  vaccines: VaccineModel[] = [];
  selectedVaccine: VaccineModel | undefined;
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private animalService: AnimalService,
  ) { }

  ngOnInit(): void {
  }

  openModalConfirmDeleteVaccine(template: TemplateRef<any>, vaccine: VaccineModel) {
    this.selectedVaccine = vaccine;
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-sm modal-dialog modal-dialog-scrollable' });
  }

  decline(): void {
    this.modalRef?.hide();
    this.selectedVaccine = undefined;
  }

}
