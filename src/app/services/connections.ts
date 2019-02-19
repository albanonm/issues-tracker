import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reject, resolve } from 'q';
import { Repo } from '../models/repo.model';
import { IssuesItem } from '../models/issuesItem.model';
import { User } from '../models/user.model';

@Injectable()
export class Connections {

    GITHUB_URL = 'https://github.com/';

    API_URL: string = 'https://api.github.com/repos';
    
    private repoUser: string = "";
    private repoName: string = "";
    private totalIssues: number = 0;


    constructor(private http: HttpClient) { }


    /**
     * 
     */
    getRepoUser(): string {
        return this.repoUser;
    }


    /**
     * 
     */
    getRepoName(): string {
        return this.repoName;
    }




    






    /**
     * 
     * @param url URL of the github repo
     * @param page number of page to list. the minimun values is 1.
     * @param size Number of items to list every page
     */
    async loadRepo(url: string): Promise<Repo> {

        let apiURL = `${this.API_URL}`;

        if (!this.validURL(url)) {
            return Promise.reject('Invalid Github URL');
        }

        
        try {
            await this.loadRepoData(url);          
            let repo = new Repo;  

            repo.name = this.repoName;
            repo.user = this.repoUser;
            repo.total = this.totalIssues;
            repo.pages = Math.ceil(this.totalIssues / 30); // size always 30
            
            //let list = await this.makeGET(apiURL);
            return repo;
        } catch (error) {
            return error;
        }

/*
        this.http.get(url,{}).subscribe(
            data => { // success path
            // to do
            console.log('success', data);
            }, 
            error => { // error path
                console.log('oops', error);
            }
        );
*/

    }





    loadIssues(user: string, repo: string, page: number): Promise<IssuesItem[]> {

        //return Promise.resolve([]);

        return new Promise((resolve, reject) => {

            let apiURL = `${this.API_URL}/${user}/${repo}/issues?state=all&page=${page}`;
            this.makeGET(apiURL)
                .then(issues => {
                    let _issuesList: IssuesItem[] = [];
                    if (typeof issues === 'object' && issues.length > 0) {
                        issues.forEach(issue => {
                            if (typeof issue === 'object' && Object.keys(issue).length > 0) {
                                // create new issue item
                                let _issue: IssuesItem = new IssuesItem;
                                _issue.number = issue.number;
                                _issue.url = issue.html_url;
                                _issue.title = issue.title;
                                _issue.created_at = issue.created_at;
                                _issue.updated_at = issue.updated_at;
                                _issue.state = issue.state;
                                _issue.comments = issue.comments;
                                // Create new user item
                                let _user: User = new User;
                                _user.login = issue.user.login;
                                _user.avatar = issue.user.avatar_url;
                                _user.url = issue.user.html_url;
                                // assign user item to issue item
                                _issue.user = _user;
                                // Add new issue item to the issue list
                                _issuesList.push(_issue);
                            }   
                        });
                    }
                    
                    return resolve(_issuesList);
                    //return data;
                })
                .catch(error => {
                    return reject("Problems with issues list: "+error);
                });
        });      
    }









    private makeGET(url:string): Promise<any> {

        return new Promise((resolve, reject) => {
            //let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
            this.http
              .get(url)
              .toPromise()
              .then(
                res => {
                  // Success
                  resolve(res);
                  /*
                  this.results = res.results.map(item => {
                    return new SearchItem(
                      item.trackName,
                      item.artistName,
                      item.trackViewUrl,
                      item.artworkUrl30,
                      item.artistId
                    );
                  });
                  */
                },
                error => {
                  // Error
                  reject(error);
                }
              );
          });
    }





    private validURL(url:string): boolean {
        var pattern = new RegExp(
            '^(https?:\/\/)?(github.com\/)' +   // 1 - Check basic github URL
            '([\\w|\\s|-]+)\/([\\w|\\s|-]+)');  // 2 - Check if exists "{user}/{project}"
        if(!pattern.test(url)) {
            return false;
        } else {
            return true;
        }
    }



    private loadRepoData(url: string): Promise<any>  {

        let _string = url.replace(/https?:\/\/github.com\//, "");
        let _data = _string.split("/");
        if (_data.length !== 2) {
            return Promise.reject("Invalid repo arguments.");
        }

        // set current repo name and user owner.
        let _repoUser = _data[0];
        let _repoName = _data[1];


        let apiURL = `${this.API_URL}/${_repoUser}/${_repoName}`;
        return this.makeGET(apiURL)
            .then(data => {
                // Check if exists repo name data
                if (data.hasOwnProperty('name') && data.name !== "") {
                    // check if exists user name data
                    if (data.hasOwnProperty('owner') && data.owner.hasOwnProperty('login') && data.owner.login !== "") {
                    
                        let _issues = 0;
                        if (data.hasOwnProperty('open_issues_count') && data.open_issues_count !== "" ) {
                            _issues = parseInt(data.open_issues_count);
                        }


                        this.repoUser = data.owner.login;
                        this.repoName = data.name;
                        this.totalIssues = _issues;


                        return resolve({
                            name: data.name,
                            user: data.owner.user,
                            issues: _issues
                        });
                    }
                }
                return reject("Invalid repo.");  
            })
            .catch(error => {
                return reject(error);
            });

        //throw new Error('Invalid repo data.');
        
    }


}