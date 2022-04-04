import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCompetenciaComponent } from './crear-competencia.component';

describe('CrearCompetenciaComponent', () => {
  let component: CrearCompetenciaComponent;
  let fixture: ComponentFixture<CrearCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCompetenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
