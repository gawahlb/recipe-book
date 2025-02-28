import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'Hamburger',
            'Really good hamburger!', 
            '#',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Buns', 2)
            ])
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}