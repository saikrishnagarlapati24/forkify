import icons from 'url:../../img/icons.svg';
import View from './View.js';

class AddARecipeView extends View{
  _parentEl = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  
  constructor(){
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow()
  }

  toggleWindow(){
    this._overlay.classList.toggle('hidden'); 
    this._window.classList.toggle('hidden');
    // this._addHandlerCloseWindow(); //this also works
  }

  _addHandlerShowWindow(){
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));/* function(e){ */
      // this._overlay.classList.toggle('.hidden'); //these two lines 'this' does not refer to the object
      // this._window.classList.toggle('.hidden');
    // })
  }

  _addHandlerCloseWindow(){
    [this._btnClose, this._overlay].forEach(el => el.addEventListener('click', this.toggleWindow.bind(this)))
  }

  _addHandlerupload(hanlder){
    this._parentEl.addEventListener('submit', function(e){
      e.preventDefault();
      const dataArr = [...new FormData(this)];//here this is the form element
      const data = Object.fromEntries(dataArr);
      hanlder(data);
    })
  }
}

export default new AddARecipeView();