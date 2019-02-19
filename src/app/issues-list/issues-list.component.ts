import { Component, OnInit, Input } from '@angular/core';
import { IssuesItem } from '../models/issuesItem.model';

@Component({
  selector: 'issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {


  @Input() issues: IssuesItem;

  constructor() { }

  ngOnInit() {
  }

}
