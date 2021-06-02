import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View{
  _parentEl = document.querySelector('.bookmarks__list');

  addHandlerRenBkmrk(handler){
    window.addEventListener('load', handler);
  }

  _generateMarkup(){
    if(this._data.length === 0){
      return `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>
          No bookmarks yet. Find a nice recipe and bookmark it :)
        </p>
      </div>
      `;
    }
    return this._data.map(bkmrk => previewView.render(bkmrk, false)).join('');
  }



  // since this code is same here and the resView, it is written commonly in the previewView.js and used from there in both the files

  // _generateMarkup(){
  //   return this._data.map(res => this._generateMarkupPreview(res)).join('');
  // }

  // _generateMarkupPreview(res){
  //   const id = window.location.hash.slice(1);

  //   return `
  //     <li class="preview">
  //     <a class="preview__link ${res.id === id ? 'preview__link--active': ''}" href="#${res.id}">
  //       <figure class="preview__fig">
  //         <img src="${res.image}" alt="${res.title}" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${res.title}</h4>
  //         <p class="preview__publisher">${res.publisher}</p>
  //       </div>
  //     </a>
  //     </li>
  //   `;
  // }
}

export default new BookmarksView();