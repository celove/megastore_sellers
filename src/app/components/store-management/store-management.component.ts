import { Component, inject, ViewChild } from '@angular/core';
import { UserService } from '../../services/auth/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoadingService } from '../../services/auth/loading.service';
import cep from 'cep-promise';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { File } from 'buffer';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-store-management',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, ButtonModule, CommonModule, NgxMaskDirective, PanelModule, FieldsetModule, FileUploadModule, BadgeModule, DropdownModule],
  templateUrl: './store-management.component.html',
  styleUrl: './store-management.component.scss',
  providers: [provideNgxMask()]
})
export class StoreManagementComponent {
  router = inject(Router);
  userService = inject(UserService);
  messageService = inject(MessageService);
  loadingService = inject(LoadingService);
  @ViewChild('userForm') userForm!: NgForm;
  user = this.userService.newUser();
  fieldsDisabled = true;
  themes: any[] | undefined;

  selectedtheme: any | undefined;

  ngOnInit() {
      this.themes = [
          { name: 'Tema escuro', code: 'NY' },
          { name: 'Tema claro', code: 'RM' },
          { name: 'Tema Rosa', code: 'LDN' },
          { name: 'Alto Contraste', code: 'IST' }
      ];
  }

  submitForm() {
    if (this.userForm.valid) {
      if (this.user.id == '') {
        this.userService.createUser(this.user).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Usuário cadastrado com sucesso!' })
          this.router.navigateByUrl('/dashboard-user');
        });
      } else {
        this.userService.updateUser(this.user).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Usuário atualizado com sucesso!' })
          this.router.navigateByUrl('/dashboard-user');
        });
      }
      // Handle form submission logic, such as sending the user data to a server
    } else {
      console.error('Form is invalid');
    }
  }

  edit() {
    this.fieldsDisabled = false;
  }

  clearForm() {
    this.userForm.reset();
  }

  onBlurCep(value: string | number) {
    this.loadingService.load();
    cep(value)
      .then(add => {
        this.user.address.city = add.city;
        this.user.address.state = add.state;
        this.user.address.neighborhood = add.neighborhood;
        this.user.address.street = add.street;
      })
      .catch(err => {
        this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Cep não encontrado!' });
      })
      .finally(()=> {
        this.loadingService.loaded();
      })
  }

  files: Array<File> = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;

  constructor(private config: PrimeNGConfig) {}

  choose(even: Event, callback: any) {
      callback();
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
      removeFileCallback(event, index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event: any) {
      this.files = event.currentFiles;
      this.files.forEach((file) => {
          this.totalSize += parseInt(this.formatSize(file.size));
      });
      this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: any) {
      callback();
  }

  formatSize(bytes: any) {
      const k = 1024;
      const dm = 3;
      const sizes = this.config.translation.fileSizeTypes;
      if (bytes === 0 && sizes) {
          return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
      if(sizes){
        return `${formattedSize} ${sizes[i]}`;
      }
      return ``
  }



}
