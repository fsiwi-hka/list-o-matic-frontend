import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockElementInputGroupComponent } from './block-element-input-group.component';

describe('BlockElementInputGroupComponent', () => {
  let component: BlockElementInputGroupComponent;
  let fixture: ComponentFixture<BlockElementInputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockElementInputGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockElementInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
