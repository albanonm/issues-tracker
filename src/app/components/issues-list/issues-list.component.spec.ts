import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesListComponent } from './issues-list.component';
import { IssuesItem } from '../../models/issuesItem.model';
import { User } from '../../models/user.model';

describe('IssuesListComponent', () => {
  let component: IssuesListComponent;
  let fixture: ComponentFixture<IssuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('#Check render', () => {
  
    let user: User = {
      login: "John",
      avatar: "/url/of/avatar",
      url: "/url/of/profile"
    }
    let issue: IssuesItem = {
      number: 1,
      url: "/url/of/repo/",
      title: "Repo name",
      created_at: "",
      updated_at: "",
      state: "open",
      comments: 70,
      user: user,
    };

    
    it('should render a list of items', () => {
      component['issues'] = [issue, issue];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ul')).toBeTruthy();
    });


    it('items should contain a user image', () => {
      component['issues'] = [issue, issue];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ul').querySelector('li').querySelector('div').querySelector('img')).toBeTruthy();
    });

    it('items should contain a user image', () => {
      component['issues'] = [issue, issue];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ul').querySelector('li').querySelector('div').querySelector('h5')).toBeTruthy();
    });

  });
});
