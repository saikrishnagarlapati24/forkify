import View from './View.js';
import previewView from './previewView.js';

class ResView extends View{  /* ResultsView */
  _parentEl = document.querySelector('.results');

  _generateMarkup(){
    // return this._data.map(res => this._generateMarkupPreview(res)).join('');
    return this._data.map(res => previewView.render(res, false)).join('');
  }

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

export default new ResView();