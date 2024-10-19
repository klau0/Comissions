import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPackageComponent } from './artist-package.component';

describe('ArtistPackageComponent', () => {
  let component: ArtistPackageComponent;
  let fixture: ComponentFixture<ArtistPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
