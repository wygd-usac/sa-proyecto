import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEquipoComponent } from './cliente-equipo.component';

describe('ClienteEquipoComponent', () => {
  let component: ClienteEquipoComponent;
  let fixture: ComponentFixture<ClienteEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
