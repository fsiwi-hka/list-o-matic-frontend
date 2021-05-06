import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkingListsComponent } from './talking-lists.component';

describe('TalkingListsComponent', () => {
  let component: TalkingListsComponent;
  let fixture: ComponentFixture<TalkingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkingListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
