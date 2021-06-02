import 'D:/web development/udemy/The Complete JavaScript Course 2020 From Zero to Expert!/17. Modern JavaScript Development Modules and Tooling/17-Modern-JS-Modules-Tooling/starter/test.js';  //this is also running. so an external module can be used here or by linking it in the html. ANd these also make it to the final bundle
import * as mod from './model.js';
import {WIN_CLOSE_TIMEOUT} from './config.js'
import recView from './views/recView.js';
import searchView from './views/searchView.js';
import resView from './views/resView.js';
import pageView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addARecView from './views/addARecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot){//not javascript but something to do with parcel. there in the 11th video of previous section
//   module.hot.accept();
// }

const controlRec = async function(){
  try{
    //identifying the id of the recipe based on the hash in the url(when ckicked on a link, the url changes/changed in this case)
    const id = window.location.hash.slice(1);
    if(!id) return;
    recView.renderSpinner();

    //updating the results view if a result is currently rendered
    resView.update(mod.getSearchResPage());//for highlighting (in light pink) the item that is last clicked.
    
    //updating the bookmarks view if a result is currently rendered
    bookmarksView.update(mod.state.bookmarks);//this line is to just highlight a bookmark if that one is the recipe currently rendered

    //loading recipe
    await mod.loadrec(id);

    //rendering recipe
    recView.render(mod.state.recipe);
  }
  catch(err){
    console.error(err);
    recView.renderError(err);
  }
};

const controlSearchRes = async function(){
  try{
    resView.renderSpinner();

    // get the query
    const query = searchView.getQuery();
    if(!query) {
      return;
    }

    //load the query
    await mod.loadSearchRes(query);

    // render the results
    // resView.render(mod.state.search.results);//This is without pagination. Prints all the results at once.
    resView.render(mod.getSearchResPage());

    //render pagination
    pageView.render(mod.state.search);
  }
  catch(err){
    console.error(err);
    resView.renderError(err);
  }
};

const controlPagination = function(gotoPage){

  // render the results of the page
  resView.render(mod.getSearchResPage(gotoPage));

  //render pagination
  pageView.render(mod.state.search);
}

const controlServings = function(num){
  //update the recipe servings
  mod.updateServings(num);

  //update the recipe view
  // recView.render(mod.state.recipe);
  recView.update(mod.state.recipe);
}

const controlBookmark = function(){

  //add or remove bkmrks
  if(!mod.state.recipe.bookmarked) mod.addBookmark(mod.state.recipe);
  else mod.delBookmark(mod.state.recipe.id);

  //update rec view
  recView.update(mod.state.recipe);

  //render bookmarks`
  bookmarksView.render(mod.state.bookmarks);
}

const controlinitBkmrk = function(){
  bookmarksView.render(mod.state.bookmarks);
};

const controlAddRecipe = async function(data){//lesson learnt: await and catching will work only in an async function. And we should use await infront of an aync function call. Else next statements will run while it runs in the bg.
  try{
    addARecView.renderSpinner();

    //upload new recipe data
    await mod.uploadRec(data);// If we do not await the promise, then the error returned by this promise is not caught by the catch() block

    //render the created recipe in the bkmrk view
    recView.render(mod.state.recipe);
    bookmarksView.render(mod.state.bookmarks);

    //rendering a success message
    addARecView.renderMessage('Recipe was successfully created 🎉');

    //changing the url
    window.history.pushState(null, '', `#${mod.state.recipe.id}`);

    //closing the form
    setTimeout(function(){
      addARecView.toggleWindow();
    }, WIN_CLOSE_TIMEOUT *1000);
    // addARecView.
  }catch(err){
    console.error(err);
    addARecView.renderError(err);
  }
}




const init = function(){
  bookmarksView.addHandlerRenBkmrk(controlinitBkmrk);
  recView.addHandlerRenderRec(controlRec);
  searchView.addHandlerSearch(controlSearchRes);
  pageView.addHandlerClick(controlPagination);
  recView.addHandlerUpdateServ(controlServings);
  recView.addHandlerbookmark(controlBookmark);
  addARecView._addHandlerupload(controlAddRecipe);
}
init();



























