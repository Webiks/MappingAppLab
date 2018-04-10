import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MARKER_COLORS, PositionFormService } from '../position-form.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input('selectedIndex') private _selectedIndex = 0;
  @Input('Active') Active;
  @Output('togglePickedEmitter') togglePickedEmitter = new EventEmitter();
  @Output('selectedIndexChange') selectedIndexChange = new EventEmitter();
  @Input('disabledAction') disabledAction: boolean;
  @Input('iconsPerRow') public iconsPerRow: number;
  @Input('backdrop') public backdrop: boolean;

  @Output() labelChange = new EventEmitter();
  @Input() label = '';


  constructor(private positionFormService: PositionFormService) {
  }

  ngOnInit() {
  }

  submitLabel(popDirective, label) {
    this.label = label;
    this.labelChange.emit(label);
    popDirective.hide();
  }

  set selectedIndex(value) {
    this._selectedIndex = value;
    this.selectedIndexChange.emit(value);
  }

  get selectedColor(): string {
    return MARKER_COLORS[this.selectedIndex]['color'];
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  changeMarkerColor(selectedColorIndex) {
    this.selectedIndex = selectedColorIndex;
    if (!this.Active) {
      this.togglePickedEmitter.emit(true);
    }
  }

  markerColors() {
    return MARKER_COLORS;
  }

  getMarkerUrlByColor(color: string): string {
    return this.positionFormService.getMarkerUrlByColor(color);
  }

  calcIndex(parentIndex: number, childIndex: number, iconsPerRow = 1) {
    return (iconsPerRow * parentIndex) + childIndex;
  }

}