import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRequestDialogComponent } from './make-request-dialog.component';

describe('MakeRequestDialogComponent', () => {
  let component: MakeRequestDialogComponent;
  let fixture: ComponentFixture<MakeRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
