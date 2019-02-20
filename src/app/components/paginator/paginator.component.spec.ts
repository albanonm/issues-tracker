import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it ('should return 1 as a current page', () => {
    component['currentPage'] = 1;
    expect(component.getCurrentPage()).toEqual(1);
  });

  it ('should not loading', () => {
    component['loading'] = false;
    expect(!component.isLoading()).toBeTruthy();
  });

  it ('should return a total of 10 pages', () => {
    component['pages'] = 10;
    expect(component.getTotalPages()).toEqual(10);
  });

  it ('should generate a page list of 9 items', () => {
    component['pages'] = 12;
    component['currentPage'] = 1;
    expect(component.getPageList()).toEqual([1,2,3,4,5,0,11,12]);
  });



  it('should render a list of items into a nav item tag', () => {
    const fixture = TestBed.createComponent(PaginatorComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav').querySelector('ul').querySelector('li')).toBeTruthy();
  });
  


});
