import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRippleModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Table } from './table';
import { Identifiable } from './identifiable';

describe('Table Component', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;

  const mockItems: Identifiable[] = [
    { id: 101, name: 'Tesla' },
    { id: 102, name: 'Ford' },
    { id: 103, name: 'Toyota' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table, ScrollingModule, MatRippleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;

    const viewport = fixture.debugElement.query(By.css('.viewport')).nativeElement;
    viewport.style.height = '400px';

    fixture.detectChanges();
  });

  it('should create the table', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct accessibility roles to the host', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.getAttribute('role')).toBe('table');
    expect(hostElement.getAttribute('aria-label')).toBe('Items List');
  });

  it('should render the provided items', () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('.data-row'));
    expect(rows.length).toBe(3);

    const firstRowText = rows[0].nativeElement.textContent;
    expect(firstRowText).toContain('Tesla');
    expect(firstRowText).toContain('101');
  });

  it('should emit the clicked item when a row is clicked', () => {
    const emitSpy = vi.spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const firstRow = fixture.debugElement.query(By.css('.data-row'));
    firstRow.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(mockItems[0]);
  });

  it('should return the correct id from trackById', () => {
    const result = component.trackById(0, mockItems[1]);
    expect(result).toBe(102);
  });

  it('should show zero rows when items input is empty', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('.data-row'));
    expect(rows.length).toBe(0);
  });
});
