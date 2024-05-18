import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonDiceComponent } from './simon-dice.component';

describe('SimonDiceComponent', () => {
  let component: SimonDiceComponent;
  let fixture: ComponentFixture<SimonDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimonDiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimonDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
