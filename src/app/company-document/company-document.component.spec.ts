import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDocumentComponent } from './company-document.component';

describe('CompanyDocumentComponent', () => {
  let component: CompanyDocumentComponent;
  let fixture: ComponentFixture<CompanyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
