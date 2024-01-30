import Backbone from 'backbone';
import { IngredientsPageView } from './pages/recipe-view-page/ingredients-page';

export class AppRouter extends Backbone.Router {
    constructor() {
        super();
        this.routes = {
            'ingredients': 'ingredients'
        };
        this.initialize();
    }

    initialize() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        console.log('Attaching event listeners');
        // let ingredientsLink = document.getElementById('ingredientsLink');
        // if (ingredientsLink) {
        //     ingredientsLink.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         this.navigate('ingredients', {trigger: true});
        //     });
        // } else {
        //     console.warn('Could not find "ingredientsLink" element.');
        // }
    }

    ingredients() {
        console.log('Ingredients route hit');
        let ingredientsPageView = new IngredientsPageView();
        ingredientsPageView.render();
    }
}
