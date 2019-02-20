import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  private pageList: number[] = [];      // array utility with list of page numbers.

  @Input() pages: number = 0;
  @Input() currentPage: number = 1;
  @Input() loading: boolean = false;

  @Output() clickNext = new EventEmitter<void>();
  @Output() clickPrev = new EventEmitter<void>();
  @Output() clickPage = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  /**
   * Current page number
   */
  getCurrentPage(): number {
    return this.currentPage;
  }

  /**
   * Number of total pages
   */
  getTotalPages(): number {
    return this.pages;
  }

  /**
   * If is loading currently.
   */
  isLoading():boolean {
    return this.loading;
  }

  /**
   * Returns an array with a list of pages
   */
  getPageList():number[] {
    this.generatePageList();
    return this.pageList;
  }


  /**
   * Emit event to go to specific page
   * @param n page to load
   */
  goToPage(n: number): void {
    this.clickPage.emit(n);
  }

  /**
   * Emit event to go to the previous page
   */
  goToPrev(): void {
    this.clickPrev.emit();
  }

  /**
   * Emit event to go to the next page
   */
  goToNext(): void {
    this.clickNext.emit();
  }


  /**
   * Array with a list with the number of pages.
   * @param num total number of pages.
   */
  private generatePageList() {
    this.pageList = [];

    /*
    for(var i = 1; i <= this.pages; i++) {
      this.pageList.push(i);
    }
  */


    for(var i = 1; i <= this.pages; i++) {
      
      if (this.currentPage < 4) {
        if (i < 6 || i > this.pages - 2) {
          this.pageList.push(i);
        }else if (this.pageList[this.pageList.length-1] !== 0) {
          this.pageList.push(0);
        }
      }
      else if (this.currentPage > (this.pages - 4)) {
        if (i > this.pages - 6 || i < 3) {
          this.pageList.push(i);
        }else if (this.pageList[this.pageList.length-1] !== 0) {
          this.pageList.push(0);
        }
      }
      else if (i < 3 || i > this.pages - 2 || ((i > this.currentPage - 3) && (i < this.currentPage + 3))) {
        this.pageList.push(i);          
      }else if (this.pageList[this.pageList.length-1] !== 0) {
        this.pageList.push(0);
      }

//      if (i < 3 || i > (this.pages - 2)) {
//        this.pageList.push(i);
//      } 
      
    }


  }

}
