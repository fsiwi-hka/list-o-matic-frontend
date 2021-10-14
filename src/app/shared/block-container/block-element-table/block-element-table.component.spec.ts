import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockElementTableComponent } from './block-element-table.component';

describe('BlockElementTableComponent', () => {
  let component: BlockElementTableComponent;
  let fixture: ComponentFixture<BlockElementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockElementTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockElementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
