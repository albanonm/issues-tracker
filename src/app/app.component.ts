import { Component } from '@angular/core';

import { ConnectionsService } from './services/connections.service'
import { Repo } from './models/repo.model';
import { IssuesItem } from './models/issuesItem.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  private title: string = 'Github issues tracker';
  private page: number = 1;             // Default first page
  private size: number = 24;            // Set 24 because is good for grids: it is divisible by 2, 3, 4, 6, 8
  

  private loading: boolean = false;     // Loading flag
  private loadingRepo: boolean = false; // Loading flag
  private repo: Repo = new Repo;        // Repo basic data
  private issues: IssuesItem[] = [];    // list with a page of issues items
  private textError: string = "";
  

  private searchUrl: string = ""; //"https://github.com/phonegap/phonegap-plugin-push";
  


  constructor(private connections: ConnectionsService) {

  }


  /**
   * Load repository data.
   */
  async getIssuesList() {
    
    if (this.loading || this.loadingRepo) {
      return;
    }

    this.repo = new Repo;
    this.issues = [];
    this.textError = "";

    this.loadingRepo = true;
    
    // Basic clean URL string
    this.searchUrl = this.searchUrl.trim();
    this.searchUrl = this.searchUrl.replace(/\/$/, "");

    try {
      // Load repo basic data
      this.repo = await this.connections.loadRepo(this.searchUrl);
      this.repo.pages = Math.ceil(this.repo.total / this.size);
      //console.log("total: "); 
      //console.log(JSON.stringify(this.repo)); 
      // Get first page of the repository issues
      await this.loadIssues(this.page);
      
    } catch (error) {
      //alert("ERROR: "+JSON.stringify(error));
      this.textError = error;
    } finally {
      this.loadingRepo = false;
    }
    
  }



  /**
   * Load selected page number of current repo.
   * @param num page number to load.
   */
  loadPage(num) {
    this.loadIssues(num);
  }


  /**
   * Load previous issues page.
   */
  previousPage() {
    let num = this.page - 1;
    this.loadPage(num);
  }


  /**
   * Load next issues page.
   */
  nextPage() {
    let num = this.page + 1;
    this.loadPage(num);
  }


  /**
   * Load the selected page of issues.
   */
  private async loadIssues(num): Promise<any> {

    // If currently loading, stop.
    if (this.loading) {
      return;
    }
    
    // Lock loading before start.
    this.loading = true;
    this.issues = [];
    // Check if new page is valid.
    this.updatePage(num);

    try {
      // load repo issues page list
      this.issues = await this.connections.loadIssues(this.repo.user, this.repo.name, this.page, this.size);
      //console.log("Issues list: "); 
      //console.log(JSON.stringify(this.issues));
      return Promise.resolve(this.issues);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      // Unlock loading after end.
      this.loading = false;
    }
  }


  /**
   * Check and update current page to load.
   * @param num current page to load.
   */
  private updatePage(num:number) {
    if (num < 1) {
      this.page = 1;
    }else if(num > this.repo.pages) {
      this.page = this.repo.pages;
    }
    else{
      this.page = num;
    }
  }


}
