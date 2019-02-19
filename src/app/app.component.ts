import { Component } from '@angular/core';

import { Connections } from './services/connections'
import { Repo } from './models/repo.model';
import { IssuesItem } from './models/issuesItem.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  private title: string = 'Github issues tracker';
  private page: number = 1;
  //private totalPages: number = 0;
  private pageList: number[] = [];

  private loading: boolean = false;
  private repo: Repo = new Repo;
  private issues: IssuesItem[] = [];
  

  private searchUrl: string = "https://github.com/phonegap/phonegap-plugin-push";


  constructor(private connections: Connections) {

  }


  async getIssuesList() {
    
    if (this.loading) {
      return;
    }
    
    this.searchUrl = this.searchUrl.trim();
    this.searchUrl = this.searchUrl.replace(/\/$/, "");

    try {
      // Load repo basic data
      this.repo = await this.connections.loadRepo(this.searchUrl);
      console.log("total: "); 
      console.log(JSON.stringify(this.repo)); 
      this.generatePageList(this.repo.pages);

      await this.loadIssues(this.page);
      
    } catch (error) {
      alert("ERROR: "+JSON.stringify(error));
    }
    
  }



  /**
   * Load selected page number of current repo.
   * @param num page number to load.
   */
  loadPage(num) {
    this.loadIssues(num);
  }


  previousPage() {
    let num = this.page - 1;
    this.loadPage(num);
  }


  nextPage() {
    let num = this.page + 1;
    this.loadPage(num);
  }


  private async loadIssues(num) {

    if (this.loading) {
      return;
    }
    
    this.loading = true;
    this.issues = [];
    this.updatePage(num);

    try {
      // load repo issues page list
      this.issues = await this.connections.loadIssues(this.repo.user, this.repo.name, this.page);
      console.log("Issues list: "); 
      console.log(JSON.stringify(this.issues)); 
    } catch (error) {
      alert("ERROR: "+JSON.stringify(error));
    } finally {
      this.loading = false;
    }
  }



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


  private generatePageList(num) {

    this.pageList = [];
    for(var i = 1; i <= num; i++) {
      this.pageList.push(i);
    }

  }


}
