import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockElementTableRowComponent } from './block-element-table-row.component';

describe('BlockElementTableRowComponent', () => {
  let component: BlockElementTableRowComponent;
  let fixture: ComponentFixture<BlockElementTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockElementTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockElementTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
