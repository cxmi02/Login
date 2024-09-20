import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  items = [
    { id: 1, name: 'Item 1', description: 'Descripción 1' },
    { id: 2, name: 'Item 2', description: 'Descripción 2' },
    { id: 3, name: 'Item 3', description: 'Descripción 3' }
  ];

  modalState: 'add' | 'update' | null = null;
  newItem = { name: '', description: '' };
  editItem: any = null;

  constructor(private router: Router, private authService: AuthService) {}

  openModal(type: 'add' | 'update', item: any = null) {
    this.modalState = type;
    if (type === 'update') {
      this.editItem = { ...item };
    } else {
      this.newItem = { name: '', description: '' };
    }
  }

  closeModal() {
    this.modalState = null;
  }

  addItem() {
    const newItem = { id: this.items.length + 1, ...this.newItem };
    this.items.push(newItem);
    this.closeModal();
  }

  updateItem() {
    const index = this.items.findIndex(item => item.id === this.editItem.id);
    if (index !== -1) {
      this.items[index] = this.editItem;
    }
    this.closeModal();
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']);
  }
}
