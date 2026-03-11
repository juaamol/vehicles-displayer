import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakesInformation } from './makes-information';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { InformationActions } from '../../store/actions/information.actions';
import { selectInformationByMakeId } from '../../store/selectors/information.selectors';
import { Table } from '../../components/table/table';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { selectMakesState } from '../../store/selectors/makes.selectors';

describe('MakesInformation', () => {
  let component: MakesInformation;
  let fixture: ComponentFixture<MakesInformation>;
  let store: MockStore;

  const mockId = 441;
  const mockInfo = {
    types: [{ id: 1, name: 'Passenger Car' }],
    models: [{ id: 10, name: 'Model S' }],
  };

  const createMockState = (data: any = { types: [], models: [] }) => ({
    makes: {
      vehicleTypes: { [mockId]: data.types },
      vehicleModels: { [mockId]: data.models },
      items: [],
      loading: false,
    },
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakesInformation],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: createMockState(),
          selectors: [
            {
              selector: selectMakesState,
              value: createMockState().makes,
            },
            {
              selector: selectInformationByMakeId(mockId),
              value: { types: [], models: [] },
            },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? mockId.toString() : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MakesInformation);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse makeId from route snapshot', () => {
    expect(component.makeId).toBe(mockId);
  });

  it('should dispatch "loadInformation" if data is missing on init', () => {
    const spy = vi.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(InformationActions.loadInformation({ makeId: mockId }));
  });

  it('should NOT dispatch "loadInformation" if data already exists', () => {
    store.setState(createMockState(mockInfo));
    fixture.detectChanges();
    const spy = vi.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should pass correct data to the tables', async () => {
    store.setState(createMockState(mockInfo));
    fixture.detectChanges();
    await Promise.resolve();

    const tables = fixture.debugElement.queryAll(By.directive(Table));

    expect(tables.length).toBe(2);
    expect(tables[0].componentInstance.items()).toEqual(mockInfo.types);
    expect(tables[1].componentInstance.items()).toEqual(mockInfo.models);
  });

  it('should display the headers correctly', () => {
    const headers = fixture.debugElement.queryAll(By.css('h2'));
    expect(headers[0].nativeElement.textContent).toBe('Vehicle types');
    expect(headers[1].nativeElement.textContent).toBe('Vehicle models');
  });
});
