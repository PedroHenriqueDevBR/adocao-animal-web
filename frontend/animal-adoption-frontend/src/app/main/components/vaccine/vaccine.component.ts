import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { VaccineModel } from 'src/app/shared/models/vaccine-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.less']
})
export class VaccineComponent implements OnInit {
  @Input() vaccines: VaccineModel[] = [];
  @Input() animal: AnimalModel = new AnimalModel();
  selectedVaccine: VaccineModel | undefined;
  modalRef?: BsModalRef;
  formVaccine: FormGroup;

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private animalService: AnimalService,
  ) {
    this.formVaccine = this.createFormVaccine();
  }

  ngOnInit(): void {}

  createFormVaccine(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  formIsValid(): boolean {
    return this.formVaccine.valid;
  }

  createVaccine() {
    const name = this.formVaccine.get('name')?.value!;
    const vaccine = new VaccineModel();
    vaccine.vaccine_name = name;
    this.animalService.addVaccine(this.animal, vaccine).subscribe(
      (data: VaccineModel) => {
        this.vaccines.push(data);
        this.toast.success('Vacina adicionada');
        this.formVaccine.get('name')?.setValue('');
      },
      error => this.verifyStatusError(error),
    );
  }

  openModalConfirmDeleteVaccine(template: TemplateRef<any>, vaccine: VaccineModel) {
    this.selectedVaccine = vaccine;
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-sm modal-dialog modal-dialog-scrollable' });
  }

  confirmDeleteVaccine() {
    if (this.selectedVaccine == undefined) {
      this.toast.warning('Nenhuma vacina selecionada!');
      return;
    }

    this.animalService.removeVaccine(this.selectedVaccine!).subscribe(
      data => {
        const vaccineIndex = this.vaccines.findIndex(el => el.id! == this.selectedVaccine!.id!);
        this.vaccines.splice(vaccineIndex, 1);
        this.selectedVaccine = undefined;
        this.toast.success('Vacina removida');
        this.decline();
      },
      error => this.verifyStatusError(error),
    );
  }

  decline(): void {
    this.modalRef?.hide();
    this.selectedVaccine = undefined;
  }

  verifyStatusError(errors: any) {
    if (errors.status >= 500) {
      this.toast.error('Servidor indisponível');
    } else if (errors.status == 406) {
      if (errors.error.errors) {
        for (let error of errors.error.errors) {
          this.toast.error(error);
        }
      }
    } else if (errors.status == 403) {
      this.toast.error("Sem permissão");
    } else {
      this.toast.error('Erro interno');
    }
  }

}
