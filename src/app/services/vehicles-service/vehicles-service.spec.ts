import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { VehiclesService } from './vehicles-service';
import { API_URL } from '../../environment/env';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(VehiclesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllMakes', () => {
    it('should retrieve all makes and map them to the Make model', () => {
      const mockResponse = {
        Results: [
          { Make_ID: 443, Make_Name: 'Maserati' },
          { Make_ID: 442, Make_Name: 'Jaguar' },
        ],
      };

      service.getAllMakes().subscribe((makes) => {
        expect(makes.length).toBe(2);
        expect(makes[0]).toEqual({ id: 443, name: 'Maserati' });
        expect(makes[1]).toEqual({ id: 442, name: 'Jaguar' });
      });

      const req = httpMock.expectOne(`${API_URL}/vehicles/GetAllMakes?format=json`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getVehicleTypesByMakeId', () => {
    it('should retrieve vehicle types and map them to Identifiable', () => {
      const makeId = 443;
      const mockResponse = {
        Results: [{ VehicleTypeId: 2, VehicleTypeName: 'Passenger Car' }],
      };

      service.getVehicleTypesByMakeId(makeId).subscribe((types) => {
        expect(types.length).toBe(1);
        expect(types[0]).toEqual({ id: 2, name: 'Passenger Car' });
      });

      const req = httpMock.expectOne(
        `${API_URL}/vehicles/GetVehicleTypesForMakeId/${makeId}?format=json`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getVehicleModelsByMakeId', () => {
    it('should retrieve models and map them to Identifiable', () => {
      const makeId = 442;
      const mockResponse = {
        Results: [{ Model_ID: 2242, Model_Name: 'XJ' }],
      };

      service.getVehicleModelsByMakeId(makeId).subscribe((models) => {
        expect(models.length).toBe(1);
        expect(models[0]).toEqual({ id: 2242, name: 'XJ' });
      });

      const req = httpMock.expectOne(
        `${API_URL}/vehicles/GetModelsForMakeId/${makeId}?format=json`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
