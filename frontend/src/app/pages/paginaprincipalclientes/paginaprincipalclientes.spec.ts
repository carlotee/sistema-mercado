import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaprincipalclientesComponent } from './paginaprincipalclientes';

describe('PaginaprincipalclientesComponent', () => {
  let component: PaginaprincipalclientesComponent;
  let fixture: ComponentFixture<PaginaprincipalclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaprincipalclientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaprincipalclientesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
