import Backbone from "backbone";
import _ from "underscore";
import { RecipeModel } from "../Models/recipe.model";

export class RecipeView extends Backbone.View<RecipeModel> {
    template: (data: any) => string;
    constructor(options?: Backbone.ViewOptions<RecipeModel>) {
        super(options);
        this.template = _.template($('#recipe-template').html());
    }
    render() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
}
