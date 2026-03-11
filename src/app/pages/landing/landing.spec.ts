import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Landing } from './landing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter, Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MakesActions } from '../../store/actions/makes.actions';
import { selectAllMakes } from '../../store/selectors/makes.selectors';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;
  let store: MockStore;
  let router: Router;

  const mockMakes = [
    { id: 440, name: 'Aston Martin' },
    { id: 441, name: 'Tesla' },
    { id: 442, name: 'Jaguar' },
  ];

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [{ selector: selectAllMakes, value: mockMakes }],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => (key === 'query' ? '' : 'true'),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch "loadMakes" on initialization', () => {
    const spy = vi.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(MakesActions.loadMakes());
  });

  it('should navigate to "information" details when goTo is called', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.goTo(441);
    expect(spy).toHaveBeenCalledWith(['/information/441']);
  });

  it('should filter makes by name after the debounce', async () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'tes';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    await Promise.resolve();

    const filtered = component.filteredMakes();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Tesla');
  });

  it('should filter by ID when the search mode is toggled', async () => {
    (component as any).searchForm.byName().value.set(false);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '442';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    await Promise.resolve();

    const filtered = component.filteredMakes();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Jaguar');
  });

  it('should sync the URL query parameters using the effect after debounce', async () => {
    const spy = vi.spyOn(router, 'navigate');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'aston';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({ query: 'aston', byName: true }),
        replaceUrl: true,
      }),
    );
  });

  it('should display the full list if the search query is empty', async () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    await Promise.resolve();

    expect(component.filteredMakes().length).toBe(3);
  });
});
