import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [name, setName] = useState("");
  // const [ingredients, setIngredients] = useState("");
  // const [instruction, setInstruction] = useState("");
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`/api/v1/show/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setName(data.name);
        setIngredients(data.ingredients);
        setInstruction(data.instruction);
      })
      .catch((error) => console.log(error.message));
  }, [id]);

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event) => {
    const {name, value} = event;
    setData(name: value)
    // setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/update/${id}`;

    if (name.length === 0 || ingredients.length === 0 || instruction.length === 0) return;

    const body = {
      name: data.name,
      ingredients: data.ingredients,
      instruction: stripHtmlEntities(data.instruction),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit recipe.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                required
                value={data.name}
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                required
                value={data.ingredients}
                onChange={(event) => onChange(event)}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              value={data.instruction}
              onChange={(event) => onChange(event)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Update Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
