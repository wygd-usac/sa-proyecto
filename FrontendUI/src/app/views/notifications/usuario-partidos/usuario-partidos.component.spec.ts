import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPartidosComponent } from './usuario-partidos.component';

describe('UsuarioPartidosComponent', () => {
  let component: UsuarioPartidosComponent;
  let fixture: ComponentFixture<UsuarioPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPartidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
