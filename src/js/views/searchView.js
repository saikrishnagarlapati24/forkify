class SearchView{
  _parentEl = document.querySelector('.search');

  getQuery(){
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput(){
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler){
    // this._parentEl.querySelector('.search__btn').addEventListener('click', handler); //If we want only clicking the button but not pressing enter
    this._parentEl.addEventListener('submit', /* handler */function(e){//enter or clicking the button//submit action is associated with the whole form
      e.preventDefault();
      // this._parentEl.querySelector('.search__field').value = '';//gives error because of wrong 'this'//So cleared when getting query itself
      handler();
    });
  }
}

export default new SearchView();