import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockElementTableHeadingComponent } from './block-element-table-heading.component';

describe('BlockElementTableHeadingComponent', () => {
  let component: BlockElementTableHeadingComponent;
  let fixture: ComponentFixture<BlockElementTableHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockElementTableHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockElementTableHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
