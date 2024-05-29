# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version 3.2.2

* Rails version 7.1.3

* node version 18.19.0

# Step 1 — Creating a New Rails Application

  * **rails new rails_react_recipe -d postgresql -j esbuild -c bootstrap -T**   

  * The -d flag specifies the preferred database engine, which in this case is PostgreSQL.
  * The -j flag specifies the application’s JavaScript approach. Rails offers a few different ways to handle Javascript code in Rails applications. The esbuild option passed to the -j flag instructs Rails to preconfigure esbuild as the preferred JavaScript bundler.
  * The -c flag specifies the application’s CSS processor. Bootstrap is the preferred option in this case.
  * The -T flag instructs Rails to skip the generation of test files since you won’t be writing tests for this tutorial. This command is also suggested if you want to use a Ruby testing tool different from the one Rails provides.

* Now that the application is connected to a database, start the application by running the following command:

	* **bin/dev**

# Step 2 — Installing Frontend Dependencies

  * Run the following command to install these packages with the Yarn package manager:

  * **yarn add react react-dom react-router-dom**

# Step 3 — Setting Up the Homepage

  * **rails g controller Homepage index**

# Step 4 — Configuring React as Your Rails Frontend

  * With the help of the esbuild option specified when generating the Rails application, most of the setup required to allow JavaScript to work seamlessly with Rails is already in place. All that is left is to load the React app’s entry point into the esbuild entry point for JavaScript files. To do this, start by creating a components directory in the app/javascript directory:

  * **mkdir ~/rails_react_recipe/app/javascript/components**

  * The components directory will house the component for the homepage, along with other React components in the application, including the entry file into the React application.

  * Next, open the application.js file located at app/javascript/application.js

  * **vim ~/rails_react_recipe/app/javascript/application.js**

  ```// Entry point for the build script in your package.json
	import "@hotwired/turbo-rails"
	import "./controllers"
	import * as bootstrap from "bootstrap"
	import "./components"
	```

  * The line of code added to the application.js file will import the code in the entry index.jsx file, making it available to esbuild for bundling. With the /components directory imported into the Rails app’s JavaScript entry point, you can create a React component for your homepage. The homepage will contain some texts and a call to action button to view all recipes.

  * Then, create a Home.jsx file in the components directory:

  * **vim ~/rails_react_recipe/app/javascript/components/Home.jsx**


  ```
  import React from "react";
	import { Link } from "react-router-dom";

	export default () => (
	  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
	    <div className="jumbotron jumbotron-fluid bg-transparent">
	      <div className="container secondary-color">
	        <h1 className="display-4">Food Recipes</h1>
	        <p className="lead">
	          A curated list of recipes for the best homemade meal and delicacies.
	        </p>
	        <hr className="my-4" />
	        <Link
	          to="/recipes"
	          className="btn btn-lg custom-button"
	          role="button"
	        >
	          View Recipes
	        </Link>
	      </div>
	    </div>
	  </div>
	);

	```
  * In this code, you import React and the Link component from React Router. The Link component creates a hyperlink to navigate from one page to another. You then create and export a functional component containing some Markup language for your homepage, styled with Bootstrap classes.

  * With your Home component set, you will now set up routing using React Router. Create a routes directory in the app/javascript directory:

  * **mkdir ~/rails_react_recipe/app/javascript/routes**

  * The routes directory will contain a few routes with their corresponding components. Whenever any specified route is loaded, it will render its corresponding component to the browser.

	* In the routes directory, create an index.jsx file:

	* **nano ~/rails_react_recipe/app/javascript/routes/index.jsx**

	```
	import React from "react";
	import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
	import Home from "../components/Home";

	export default (
	  <Router>
	    <Routes>
	      <Route path="/" element={<Home />} />
	    </Routes>
	  </Router>
	);
	```
	* In this index.jsx route file, you import the following modules: the React module that allows you to use React, as well as the BrowserRouter, Routes, and Route modules from React Router, which together help you navigate from one route to another. Lastly, you import your Home component, which will be rendered whenever a request matches the root (/) route. When you want to add more pages to your application, you can declare a route in this file and match it to the component you want to render for that page.


	* You have now set up routing using React Router. For React to be aware of the available routes and use them, the routes have to be available at the entry point to the application. To achieve this, you will render your routes in a component that React will render in your entry file.

	* Create an App.jsx file in the app/javascript/components directory:

	* **nano ~/rails_react_recipe/app/javascript/components/App.jsx**

	```
	import React from "react";
	import Routes from "../routes";

	export default props => <>{Routes}</>;
	```

	* In the App.jsx file, you import React and the route files you just created. You then export a component to render the routes within fragments. This component will render at the application’s entry point, making the routes available whenever the application is loaded.

	* Now that you have your App.jsx set up, you can render it in your entry file. Create an index.jsx file in the components directory:

	* **nano ~/rails_react_recipe/app/javascript/components/index.jsx**

	* Add the following code to the index.js file:

	```
	import React from "react";
	import { createRoot } from "react-dom/client";
	import App from "./App";

	document.addEventListener("turbo:load", () => {
	  const root = createRoot(
	    document.body.appendChild(document.createElement("div"))
	  );
	  root.render(<App />);
	});
	```

	* In the import lines, you import the React library, the createRoot function from ReactDOM, and your App component. Using ReactDOM’s createRoot function, you create a root element as a div element appended to the page, and you render your App component in it. When the application is loaded, React will render the content of the App component inside the div element on the page.


	* Finally, you will add some CSS styles to your homepage.

	* Open the application.bootstrap.scss file in your

	* **nano ~/rails_react_recipe/app/assets/stylesheets/application.bootstrap.scss**

	* Next, replace the contents of the application.bootstrap.scss file with the following code:

	```
	@import 'bootstrap/scss/bootstrap';
	@import 'bootstrap-icons/font/bootstrap-icons';

	.bg_primary-color {
	  background-color: #FFFFFF;
	}
	.primary-color {
	  background-color: #FFFFFF;
	}
	.bg_secondary-color {
	  background-color: #293241;
	}
	.secondary-color {
	  color: #293241;
	}
	.custom-button.btn {
	  background-color: #293241;
	  color: #FFF;
	  border: none;
	}
	.hero {
	  width: 100vw;
	  height: 50vh;
	}
	.hero img {
	  object-fit: cover;
	  object-position: top;
	  height: 100%;
	  width: 100%;
	}
	.overlay {
	  height: 100%;
	  width: 100%;
	  opacity: 0.4;
	}
	```

	
