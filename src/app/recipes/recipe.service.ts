import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    //private recipes: Recipe[] = [
    //    new Recipe(
    //        'Hamburger',
    //        'Really good hamburger!', 
    //        '#',
    //        [
    //            new Ingredient('Meat', 1),
    //            new Ingredient('Buns', 2)
    //        ])
    //  ];
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService, private http: HttpClient) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        this.http.get<{message: string, recipes: Recipe[]}>('http://localhost:3000/api/recipes')
         .subscribe((recipeData) => {
            this.recipes = recipeData.recipes;
            this.recipesChanged.next([...this.recipes]);
        });
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.http.post<{message: string}>('http://localhost:3000/api/recipes', recipe)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.recipes.push(recipe);
                this.recipesChanged.next(this.recipes.slice());
            });
        
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}