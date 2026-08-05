import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: [] // <--- Deixe o array vazio
})
export class AppComponent {
  title = 'cadastro-clientes';
}