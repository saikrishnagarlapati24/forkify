import icons from 'url:../../img/icons.svg';

export default class View{
  _data;
  _message = '';
  


  render(data, render = true){
    this._data = data;
    const markup = this._generateMarkup();
    if(!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  //updating dom without rerendering whole thing but just the changed thing
  update(data){
    this._data = data;
    const newmarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newmarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      //updating changed txt
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
        curEl.textContent = newEl.textContent;
      }

      //updating attributs of changed elemets
      if(!newEl.isEqualNode(curEl)){
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });

  }

  renderSpinner(){//excellent css. //This method is not going to be inside the prototype if => renderSpinner = function(){
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear(){
    this._parentEl.innerHTML = '';
  }
 
  renderError(err){
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${err.message}</p>
      </div>
    `;
     this._clear();
     this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(mes = this._message){//for any future purpose
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${mes}</p>
      </div>
    `;
     this._clear();
     this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}