import Backbone from "backbone";
import { RecipeModel } from "../models/recipe.model";

export class RecipeCollection extends Backbone.Collection<RecipeModel> {
    model = RecipeModel;
}
