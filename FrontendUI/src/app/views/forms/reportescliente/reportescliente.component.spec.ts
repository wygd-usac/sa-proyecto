import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesclienteComponent } from './reportescliente.component';

describe('ReportesclienteComponent', () => {
  let component: ReportesclienteComponent;
  let fixture: ComponentFixture<ReportesclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
