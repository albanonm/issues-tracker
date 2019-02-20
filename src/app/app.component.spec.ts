import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ConnectionsService } from './services/connections.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, RouterTestingModule
      ],
      declarations: [
        AppComponent,
        IssuesListComponent,
        PaginatorComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        ConnectionsService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Github issues tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Github issues tracker');
  });

  /*
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to issues-tracker!');
  });
  */



  it('should render an input to search into a form in nav tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav').querySelector('form').querySelector('input')).toBeTruthy();
  });


  it('should have the paginator component', async(() => {
  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.repo.pages = 1;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('paginator')).not.toBe(null);
  }));

  it('should have the issues-list component', async(() => {
  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.repo.pages = 1;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('issues-list')).not.toBe(null);
  }));

});
