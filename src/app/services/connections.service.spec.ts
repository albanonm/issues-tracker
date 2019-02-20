import { TestBed, getTestBed } from '@angular/core/testing';

import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConnectionsService } from './connections.service';
import { Repo } from '../models/repo.model';

describe('ConnectionsService', () => {

  let injector: TestBed;
  let service: ConnectionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConnectionsService]
    })

    injector = getTestBed();
    service = injector.get(ConnectionsService);
    httpMock = injector.get(HttpTestingController);

  });

  it('should be created', () => {
    const service: ConnectionsService = TestBed.get(ConnectionsService);
    expect(service).toBeTruthy();
  });


  describe('#getRepoUser', () => {
    it('should return string', () => {
      service['repoUser'] = 'phonegap';
      expect(service.getRepoUser()).toEqual('phonegap');
    });
  });

  describe('#getRepoName', () => {
    it('should return string', () => {
      service['repoName'] = 'phonegap-plugin-push';
      expect(service.getRepoName()).toEqual('phonegap-plugin-push');
    });
  });




  describe('#loadRepo', async() => {


    it('should return an Promise<Repo>', () => {
      
      const dummyRepo: Repo = {
        user: "John",
        name: "repository",
        total: 78,
        pages: 3,
      };
      //const dummyUrl = service.API_URL+'/phonegap/phonegap-plugin-push';
      const dummyUrl = 'https://github.com/phonegap/phonegap-plugin-push';


      service['repoName'] = "repository";
      service['repoUser'] = "John";
      service['totalIssues'] = 78;

      service.loadRepo(dummyUrl).then(repo => {
        expect(Object.keys(repo).length).toBe(4);
        expect(repo).toEqual(dummyRepo);
      });

    });


  });


});
