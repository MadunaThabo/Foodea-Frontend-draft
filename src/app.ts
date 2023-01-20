// console.log("The app works");

// import { Model } from 'backbone';
// import {IRecipe, RecipeService} from './Recipe'

// class Home extends Model {
//   searchString: string = ''
//   recipeForTheDay: IRecipe[] = []
//   recipeService: any;

//   constructor( ){
//     super();
//     this.recipeService = new RecipeService();
//   }

//   getRandomRecipe(n: number) {
//     return this.recipeService.getRandomRecipe(n)
//   }

// }

// var home = new Home()
// console.log('testing testing',home.getRandomRecipe(3), home.getRandomRecipe(3).confusion)
import { RecipeCollection } from './Colllection/recipe.collection';
import { RecipeModel } from './Models/recipe.model';
import { RecipeView } from './Views/recipe.view';

var recipe1 = new RecipeModel({
  title: 'Chocolate Chip Cookies',
  ingredients: ['flour', 'sugar', 'eggs', 'chocolate chips'],
  instructions: 'Preheat the oven to 350 degrees F. Mix the ingredients in a bowl. Form dough into balls and place on a baking sheet. Bake for 10-12 minutes.'
});

var recipe2 = new RecipeModel({
  title: 'Spaghetti and Meatballs',
  ingredients: ['spaghetti', 'ground beef', 'bread crumbs', 'eggs', 'salt', 'pepper'],
  instructions: 'Boil the spaghetti according to package instructions. In a separate pan, brown the ground beef and form into meatballs. Add the meatballs to the spaghetti and serve.'
});

var recipeCollection = new RecipeCollection([recipe1, recipe2]);

var recipeView = new RecipeView({
  el: '#recipe-container',
  collection: recipeCollection
});

recipeView.render();
console.log('testing testing')

