import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchespageComponent } from './matchespage.component';

describe('MatchespageComponent', () => {
  let component: MatchespageComponent;
  let fixture: ComponentFixture<MatchespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchespageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
