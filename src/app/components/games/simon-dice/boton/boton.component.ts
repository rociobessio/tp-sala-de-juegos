import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter, input } from '@angular/core';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css'
})
export class BotonComponent {
  @Input() color!: string;//-->Para obtener el input(color que presione el user)
  //-->Output para transmitir el la guess del player
  @Output() colorGuess: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  active: boolean = false;//-->Para iluminar los botones

  constructor() {}

  /**
   * Para emitir los colores
   */
  onClick(){
    this.colorGuess.emit(this.color);
  }

}
