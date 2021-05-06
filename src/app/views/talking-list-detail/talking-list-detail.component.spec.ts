import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkingListDetailComponent } from './talking-list-detail.component';

describe('TalkingListDetailComponent', () => {
  let component: TalkingListDetailComponent;
  let fixture: ComponentFixture<TalkingListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkingListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkingListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
