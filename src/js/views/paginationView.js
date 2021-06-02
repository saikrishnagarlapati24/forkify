import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View{
  _parentEl = document.querySelector('.pagination');

  _generateMarkup(){
    const numPages = Math.ceil(this._data.results.length/this._data.resPerPage);
    // console.log(numPages);
    const currPage = this._data.page;

    //page 1, there are other pages
    if(currPage === 1 && numPages>1){
      return this.nxtPagebtn(currPage);
    }

    //last page
    if(currPage === numPages && numPages>1){
      return this.prevPagebtn(currPage);
    }
    //other page
    if(currPage < numPages){
      return this.prevPagebtn(currPage)+this.nxtPagebtn(currPage);
    }

    //page 1, no other pages
    return '';
  }

  prevPagebtn(currPage){
    return `
    <button data-goto = "${currPage-1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage-1}</span>
    </button>` ;
  }

  nxtPagebtn(currPage){
    return `
      <button data-goto = "${currPage+1}" class="btn--inline pagination__btn--next">
        <span>Page ${currPage+1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  addHandlerClick(handler){
    // [document.querySelector(`.pagination__btn--prev`), document.querySelector(`pagination__btn--next`)].forEach(btn => btn.addEventListener('click', handler));
    this._parentEl.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;

      const gotoPage = +btn.dataset.goto;
      // console.log(gotoPage);
      handler(gotoPage);
    });
  }
}

export default new PaginationView();