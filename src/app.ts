console.log("The app works");

import { Model } from 'backbone';
import {IRecipe, RecipeService} from './Recipe'
import { RecipeCollection } from './collection/recipe.collection';
import { RecipeModel } from './models/recipe.model';
import { RecipeView } from './views/recipe.view';
import $ from 'jquery';
import _ from 'underscore';


class Home extends Model {
  searchString: string = ''
  recipeForTheDay: IRecipe[] = []
  recipeService: RecipeService;
  $el: JQuery<HTMLElement>;

  constructor( ){
    super();
    this.recipeService = new RecipeService();
    this.$el = $();
  }

  async getRandomRecipe(n: number) {
    let recipes: any = await this.recipeService.getRandomRecipe(n);
    let recipeCollection = new RecipeCollection(recipes.recipes);
    let recipeCollectionView = new RecipeView({
      el: '#recipe-container',
      collection: recipeCollection
    });

    console.log('recipeCollectionView', recipeCollectionView);
    console.log('recipeCollection', recipeCollection);

    recipeCollectionView.render();
    let recipeTemplate = _.template($('#recipe-template').html());
    let recipeHTML = recipeTemplate({recipes: recipeCollection.toJSON()});
    console.log("el", this.$el,'\nrecipeHTML', recipeHTML);
    // this.$el.append(recipeHTML);
    let recipeContainer = document.getElementById('recipe-container');
    if(recipeContainer) recipeContainer.innerHTML = recipeHTML;
    // recipeContainer?.innerHTML = recipeHTML;
    // $('#recipe-template').append(recipeHTML)
    // console.log(this.$el)

    
    // console.log('recipes', recipes.recipes[0].title)
    // var recipe2 = new RecipeModel({
    //   title: 'Spaghetti and Meatballs',
    //   ingredients: ['spaghetti', 'ground beef', 'bread crumbs', 'eggs', 'salt', 'pepper'],
    //   instructions: 'Boil the spaghetti according to package instructions. In a separate pan, brown the ground beef and form into meatballs. Add the meatballs to the spaghetti and serve.',
    //   image: recipes.recipes[0].image
    // });

    // recipe2 = new RecipeModel(recipes.recipes[0]);
        
    // var recipeView = new RecipeView({
    //   el: '#recipe-container',
    //   model: recipe2
    // });
    
    // recipeView.render();
    
    // $(document).ready(function(){
    //   var recipeView = new RecipeView({
    //     el: '#recipe-template',
    //     model: recipe2
    //   });
      
    //   recipeView.render();
    //   $('#recipe-template').append(recipeView.$el);  
    //   console.log('Recipe view..........')
    // });
  }

}
var home = new Home()
home.getRandomRecipe(3)
// console.log('testing testing',home.getRandomRecipe(3), home.getRandomRecipe(3).confusion)
console.log('testing testing')

