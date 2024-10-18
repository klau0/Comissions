import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionDoneDialogComponent } from './commission-done-dialog.component';

describe('CommissionDoneDialogComponent', () => {
  let component: CommissionDoneDialogComponent;
  let fixture: ComponentFixture<CommissionDoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionDoneDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionDoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
