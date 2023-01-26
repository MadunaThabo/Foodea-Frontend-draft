import Backbone from "backbone";
import _ from "underscore";
import { RecipeModel } from "../models/recipe.model";
// import $ from 'jquery';

export class RecipeView extends Backbone.View<RecipeModel> {
    template: (data: any) => string;
    // $el: any;

    constructor(options?: Backbone.ViewOptions<RecipeModel>) {
        super(options);
        // this.$el = options?.el
        this.template = _.template($('#recipe-template').html());
    }
    // render() {
    //     this.$el.html(this.template(this.model.attributes));
    //     return this;
    // }

    render() {
        if(this.collection){
            console.log("we got here")
            this.collection.each((recipe) => {
                console.log('model1', recipe)
                let recipeView = new RecipeView({ model: recipe });
                console.log("jquery", this.$el,"\nrecipeView", recipeView)
                this.$el.append(recipeView.render().el);
            });
            return this;
        }
        else{
            return this
        }
    }

    // forEach(fn: (model: RecipeModel) => void) {
    //     this.collection.forEach(fn);
    // }
      
      
}
