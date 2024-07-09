import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { User } from '../../../models/User';
import { UserService } from '../../../services/auth/user.service';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NgxMaskDirective, NgxMaskService, provideNgxMask } from 'ngx-mask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../services/auth/loading.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, TableModule, ButtonModule, ConfirmPopupModule, RouterModule, NgxMaskDirective, DialogModule,
    PasswordModule, FormsModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  statuses: any[] = [];
  maskService = inject(NgxMaskService);
  users: User[] = [];
  rowGroupMetadata: any;
  userService = inject(UserService);
  messageService = inject(MessageService);
  loadingService = inject(LoadingService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  visible: boolean = false;
  selectedUser: User = this.userService.newUser();
  confirmedPassword: string = '';

  
  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}


  ngAfterViewInit() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    })

    this.loadingService.isLoading.subscribe(il => {
      this.loading = il;
      this.cdr.detectChanges();
    })
  }

  confirm(event: Event, user: User) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja excluir o usuário ' + user.name + ' ?',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe((res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Usuário deletado com sucesso!' })
          this.ngAfterViewInit();
        })
      },
      reject: () => {

      }
    });
  }

  maskCnpj(value: string){
    return this.maskService.applyMask(value, "00.000.000/0000-00");
  }

  maskPhone(value: string){
    return this.maskService.applyMask(value, "(00) 00000-0000");
  }


  addUser() {
    this.router.navigateByUrl('user/new');
  }

  openDialogPassword(user: User) {
    if(user.password === ''){
      this.visible = true;
      this.selectedUser = user;
    }
  }

  hidePasswordDialog() {
    this.selectedUser = this.userService.newUser();    
  }

  savePassword() {
    if(this.selectedUser.password === this.confirmedPassword){
      this.userService.insertPasswordUser(this.selectedUser).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Senha criada com sucesso!' })
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Ops', detail: 'Senha divergentes!' })
    }
  }



}
