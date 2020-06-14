import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorratingPage } from './doctorrating.page';

describe('DoctorratingPage', () => {
  let component: DoctorratingPage;
  let fixture: ComponentFixture<DoctorratingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorratingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
