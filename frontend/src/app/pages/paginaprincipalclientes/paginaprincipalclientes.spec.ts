import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginaprincipalclientes } from './paginaprincipalclientes';

describe('Paginaprincipalclientes', () => {
  let component: Paginaprincipalclientes;
  let fixture: ComponentFixture<Paginaprincipalclientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginaprincipalclientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paginaprincipalclientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
