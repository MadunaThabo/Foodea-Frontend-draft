import Backbone from "backbone";
import { RecipeModel } from "../Models/recipe.model";

export class RecipeCollection extends Backbone.Collection<RecipeModel> {
    model = RecipeModel;
}
