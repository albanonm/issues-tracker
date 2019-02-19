import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pages: number = 0;
  @Input() totalPages: number[] = [];

  constructor() { }

  ngOnInit() {
  }

}
