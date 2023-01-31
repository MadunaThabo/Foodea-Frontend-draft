// //router to recipe view page
// import { Router } from 'backbone';
// import { RecipeViewPage } from '../pages/recipe-view-page/recipe-view-page';
// import { IRecipe, RecipeService } from 'src\services\Recipe.ts';

// export class AppRouter extends Router {
//   routes = {
//     '': 'home',
//     'recipe/:id': 'recipe'
//   }

//   recipeService: RecipeService;

//   constructor() {
//     super();
//     this.recipeService = new RecipeService();
//   }

//   home() {
//     console.log('home');
//   }

//   async recipe(id: string) {
//     console.log('recipe');
//     let recipe: IRecipe = await this.recipeService.getRecipe(id);
//     let recipeViewPage = new RecipeViewPage(recipe);
//     recipeViewPage.showRecipe(recipe);
//   }
// }
