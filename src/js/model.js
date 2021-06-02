import { stat } from 'fs';
import {API_URL, RESPERPAGE, KEY} from './config.js';
import {AJAX} from './helper.js';

export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      resPerPage: RESPERPAGE,
      page: 1,
    },
    bookmarks: [],
};

const createRecObj = function(data){
  const {recipe} = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key}), //watch video to understand this
  };
}

export const loadrec = async function(id){
    try{
      const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
      state.recipe = createRecObj(data);

      if(state.bookmarks.some(b => b.id === id)){
        state.recipe.bookmarked = true;
      }
      else state.recipe.bookmarked = false;
    } 
    catch(err) {
      err.message = err.message.length !== 0 ? err.message : 'Sorry..Could not find the recipe for you :( Please try another one!';
      throw err;
    }
};

export const loadSearchRes = async function(query){
  try{
    state.search.query = query;
    const data = await AJAX(`${API_URL}/?search=${query}&key=${KEY}`);

    if(data.data.recipes.length === 0){
      throw new Error();
    }

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {key: rec.key}),
      };
    });
    state.search.page = 1;
  }
  catch(err){
    err.message = err.message.length !== 0 ? err.message : `Could not find any recipe related to ${query}`;
    throw err;
  }
};

export const getSearchResPage = function(page = state.search.page){
  state.search.page = page;

  const start = (page - 1)*state.search.resPerPage;
  const end = page*state.search.resPerPage;

  return state.search.results.slice(start, end);
}

export const updateServings = function(newServ){
  state.recipe.ingredients.forEach(ing => {ing.quantity = ing.quantity ? ing.quantity * newServ/state.recipe.servings : ing.quantity});
  state.recipe.servings = newServ;
}

const persistBkmrks = function(){
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(rec){
  //add bookmark
  state.bookmarks.push(rec);

  //mark current recipe as bookmark
  /* if(rec.id === state.recipe.id) */ ///this will be always true
  state.recipe.bookmarked = true;

  persistBkmrks();
}

export const delBookmark = function(id){
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;

  persistBkmrks();
}

const init = function(){
  const stored = localStorage.getItem('bookmarks');
  if(stored) state.bookmarks = JSON.parse(stored);
}

// const clearBkmrks = function(){
//   localStorage.clear('bookmarks');
// }

// clearBkmrks();
init();

export const uploadRec = async function(newRec){//try and catch may not be in this function. Then the controller's controlAddRecipe()'s try catch will handle th error
  try{
    // console.log(newRec);
    // console.log(Object.entries(newRec));
    const ingredients = Object.entries(newRec).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing =>
      {
        // const ingArr = ing[1].replaceAll(' ','').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());
        if(ingArr.length !== 3){
          throw new Error('Please enter the 3 fields separated by commas. (empty fields are allowed 🤝)');
        }
        const [quantity, unit, description] = ingArr;
        return {quantity: !quantity ? null : +quantity , unit, description};
      });
    
    // ingredients.forEach(ing => ing.quantity = !ing.quantity ? null : +ing.quantity); ///yaayyyy. I did this on my own. But could be done better as shown above.

    const recipe = {
      title: newRec.title,
      publisher: newRec.publisher,
      image_url: newRec.image,//
      source_url: newRec.sourceUrl,//
      servings: +newRec.servings,
      cooking_time: +newRec.cookingTime,//these 3 property names were changed based on the error I got while sending JSON. 
      ingredients,
      //id property is being created by the API itself and being returned below in the data and also createdAT and key properties
    }
    // console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecObj(data);
    addBookmark(state.recipe);
  }
  catch(err){
    err.message = `Could not upload the recipe :(`;
    throw err;
  }
}
