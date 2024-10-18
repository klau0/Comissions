import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImagesDialogComponent } from './view-images-dialog.component';

describe('ViewImagesDialogComponent', () => {
  let component: ViewImagesDialogComponent;
  let fixture: ComponentFixture<ViewImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewImagesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
