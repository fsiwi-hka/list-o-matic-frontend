import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockElementTableCellComponent } from './block-element-table-cell.component';

describe('BlockElementTableCellComponent', () => {
  let component: BlockElementTableCellComponent;
  let fixture: ComponentFixture<BlockElementTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockElementTableCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockElementTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
