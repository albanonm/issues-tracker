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
  
  title: string = 'issues-tracker';
  page: number = 1;
  totalPages: number = 0;
  pageList: number[] = [];

  repo: Repo = new Repo;
  issues: IssuesItem[] = [];
  

  searchUrl: string = "https://github.com/phonegap/phonegap-plugin-push";


  constructor(private connections: Connections) {

  }


  async getIssuesList() {
    
    this.searchUrl = this.searchUrl.trim();
    this.searchUrl = this.searchUrl.replace(/\/$/, "");

    try {
      // Load repo basic data
      this.repo = await this.connections.loadRepo(this.searchUrl);
      console.log("total: "); 
      console.log(JSON.stringify(this.repo)); 
      this.generatePageList(this.repo.pages);

      await this.loadIssues();
      
    } catch (error) {
      alert("ERROR: "+JSON.stringify(error));
    }
     
  }


  async loadIssues() {
    try {
      // load repo issues page list
      this.issues = await this.connections.loadIssues(this.repo.user, this.repo.name, this.page);
      console.log("Issues list: "); 
      console.log(JSON.stringify(this.issues)); 
      
    } catch (error) {
      alert("ERROR: "+JSON.stringify(error));
    }
  }


  loadPage(num) {
    this.page = num;
      this.loadIssues();
  }


  previousPage() {
    if (1 < this.page) {
      this.page --;
      this.loadIssues();
    }
  }


  nextPage() {
    if (this.repo.pages > this.page) {
      this.page ++;
      this.loadIssues();
    }  
  }



  private generatePageList(num) {

    this.pageList = [];
    for(var i = 1; i <= num; i++) {
      this.pageList.push(i);
    }

  }


}
