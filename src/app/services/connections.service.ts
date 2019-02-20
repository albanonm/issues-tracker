import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reject, resolve } from 'q';
import { Repo } from '../models/repo.model';
import { IssuesItem } from '../models/issuesItem.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

    //GITHUB_URL = 'https://github.com/';
    API_URL: string = 'https://api.github.com/repos';
    
    private repoUser: string = "";          // Repository username
    private repoName: string = "";          // Repository name
    private totalIssues: number = 0;        // 


    constructor(private http: HttpClient) { }



    /**
     * Username owner of the repository
     */
    getRepoUser(): string {
        return this.repoUser;
    }


    /**
     * Name of the Github repository.
     */
    getRepoName(): string {
        return this.repoName;
    }






    /**
     * Load basic repository data from a URL.
     * @param url URL of the github repository lo load.
     */
    async loadRepo(url: string): Promise<Repo> {

        try {
            // load repository data
            await this.loadRepoData(url);          
            // Return a Repo item.
            let repo = new Repo;  
            repo.name = this.repoName;
            repo.user = this.repoUser;
            repo.total = this.totalIssues;
            //repo.pages = Math.ceil(this.totalIssues / 30); 
            return resolve(repo);
        } catch (error) {
            return reject(error);
        }

    }




    /**
     * List of 30 items from selected repository and page.
     * @param user Username of the repository to load the issues list.
     * @param repo Name of the repository to load the issues list.
     * @param page Page of the issues to load.
     * @param size Pagination items per page.
     */
    loadIssues(user: string, repo: string, page: number, size:number): Promise<IssuesItem[]> {

        //return Promise.resolve([]);

        return new Promise((resolve, reject) => {
            // Call to Github api of issues
            let apiURL = `${this.API_URL}/${user}/${repo}/issues?state=open&page=${page}&per_page=${size}`;
            this.makeGET(apiURL)
                .then(issues => {
                    let _issuesList: IssuesItem[] = [];
                    if (typeof issues === 'object' && issues.length > 0) {
                        issues.forEach(issue => {
                            if (typeof issue === 'object' && Object.keys(issue).length > 0) {
                                // create new issue item
                                let _issue: IssuesItem = this.assignServerToAppValues(issue);
                                // Add new issue item to the issue list
                                _issuesList.push(_issue);
                            }   
                        });
                    }
                    
                    return resolve(_issuesList);
                    //return data;
                })
                .catch(error => {
                    //return reject("Problems with issues list.");
                    return reject("Problemas obteniendo la lista de cuestiones. Prueba de nuevo.");
                });
        });      
    }



    /**
     * A IssuesItem from github api raw data
     * @param data data with github api format
     */
    private assignServerToAppValues(data):IssuesItem {
      // create new issue item
      let _issue: IssuesItem = new IssuesItem;
      _issue.number = data.number;
      _issue.url = data.html_url;
      _issue.title = data.title;
      _issue.created_at = data.created_at;
      _issue.updated_at = data.updated_at;
      _issue.state = data.state;
      _issue.comments = data.comments;
      // Create new user item
      let _user: User = new User;
      _user.login = data.user.login;
      _user.avatar = data.user.avatar_url;
      _user.url = data.user.html_url;
      // assign user item to issue item
      _issue.user = _user;
      // return formatted IssueItem
      return _issue;
    }




    /**
     * Return basic repository data from a URL.
     * @param url URL string from a Github repository.
     */
    private loadRepoData(url: string): Promise<any>  {

        // Check if the URL is valid
        if (!this.validURL(url)) {
            //return Promise.reject('Invalid Github repository URL');
            return Promise.reject('La URL del repositorio de Github no es válida. El formato ha de ser https://github.com/{nombreusuario}/{nombrerepositorio}.');
        }

        // extract {username}/{repository} from the URL
        let _string = url.replace(/https?:\/\/github.com\//, "");
        let _data = _string.split("/");
        if (_data.length !== 2) {
            //return Promise.reject("Invalid repo arguments.");
            return Promise.reject("Los algumentos del repositorio no son válidos. El formato ha de ser https://github.com/{nombreusuario}/{nombrerepositorio}.");
        }

        // Set current repo name and user owner.
        let _repoUser = _data[0];
        let _repoName = _data[1];

        // Call to Github API
        let apiURL = `${this.API_URL}/${_repoUser}/${_repoName}`;
        return this.makeGET(apiURL)
            .then(data => {
                // Check if repo name exists
                if (data.hasOwnProperty('name') && data.name !== "") {
                    // check if username exists 
                    if (data.hasOwnProperty('owner') && data.owner.hasOwnProperty('login') && data.owner.login !== "") {
                    
                        let _issues = 0;
                        // Check if issues count exists
                        if (data.hasOwnProperty('open_issues_count') && data.open_issues_count !== "" ) {
                            _issues = parseInt(data.open_issues_count);
                        }

                        // Assign repository info to the current session.
                        this.repoUser = data.owner.login;
                        this.repoName = data.name;
                        this.totalIssues = _issues;

                        // return repository basic data.
                        return resolve({
                            name: data.name,
                            user: data.owner.user,
                            issues: _issues
                        });
                    }
                }
                //return reject("Invalid repository.");  
                return reject("El repositorio indicado parece no ser válido. Revisa la URL o prueba otro.");  
            })
            .catch(error => {
                //return reject(error);
                //return reject("Invalid repository data.");
                return reject("El repositorio indicado parece no ser válido. Revisa la URL o prueba otro.");  
            });

        //throw new Error('Invalid repo data.');
        
    }




    /**
     * Make a GET request to the specific URL and return the data received.
     * @param url URL to load
     */
    private makeGET(url:string): Promise<any> {

        return new Promise((resolve, reject) => {
            this.http
              .get(url)
              .toPromise()
              .then(
                // Success
                res => resolve(res),
                // Error
                error => reject(error)
              );
          });
    }




    /**
     * Check if the URL is a github repository valid URL.
     * @param url URL string.
     */
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


}