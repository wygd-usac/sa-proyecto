import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteteamComponent } from './clienteteam.component';

describe('ClienteteamComponent', () => {
  let component: ClienteteamComponent;
  let fixture: ComponentFixture<ClienteteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
