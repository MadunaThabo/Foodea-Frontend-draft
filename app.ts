console.log("The app works");

import { Model } from 'backbone';
import {IRecipe, RecipeService} from './src/services/Recipe'
import { RecipeCollection } from './src/collection/recipe.collection';
import { RecipeModel } from './src/models/recipe.model';
import { RecipeView } from './src/views/recipe.view';
import { RecipeViewPage } from './src/pages/recipe-view-page/recipe-view-page';
import $ from 'jquery';
import _ from 'underscore';


class HomePage extends Model {
  searchString: string = ''
  recipesForTheDay: IRecipe[] = []
  recipeService: RecipeService;
  $el: JQuery<HTMLElement>;

  constructor( ){
    super();
    this.recipeService = new RecipeService();
    this.$el = $();
  }

  async getRandomRecipe(n: number) {
    console.log('getRandomRecipe', n)
    let recipes: any = await this.recipeService.getRandomRecipe(n);
    let recipeCollection = new RecipeCollection(recipes.recipes);
    let recipeCollectionView = new RecipeView({
      el: '#recipe-container',
      collection: recipeCollection
    });

    recipeCollectionView.render();
    let recipeTemplate = _.template($('#recipe-template').html());
    let recipeHTML = recipeTemplate({recipes: recipeCollection.toJSON()});
    let recipeContainer = document.getElementById('recipe-container');
    if(recipeContainer) recipeContainer.innerHTML = recipeHTML;
  }

  viewRecipe(recipeIndex: number){
    console.log('viewRecipe', recipeIndex)
    let recipe = this.recipesForTheDay[recipeIndex];
    // save recipe to local storage
    localStorage.setItem('recipeToView',JSON.stringify(recipe));
    // let recipeViewPage = new RecipeViewPage();
    // recipeViewPage.showRecipe(recipe);
    //navigate to recipe view page at url: 'pages/recipe-view-page/recipe-view-page.html'
    window.location.href = 'pages/recipe-view-page/recipe-view-page.html'
  }

}
let home = new HomePage()
// home.getRandomRecipe(3)
console.log('testing testing')
// document.getElementById("view-recipe-btn").addEventListener("click", function(){
//   home.viewRecipe(2);
// });


