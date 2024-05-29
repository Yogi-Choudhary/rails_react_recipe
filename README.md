# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version 3.2.2

* Rails version 7.1.3

* node version 18.19.0

# Step 1 — Creating a New Rails Application

  **rails new rails_react_recipe -d postgresql -j esbuild -c bootstrap -T**   

  * The -d flag specifies the preferred database engine, which in this case is PostgreSQL.
  * The -j flag specifies the application’s JavaScript approach. Rails offers a few different ways to handle Javascript code in Rails applications. The esbuild option passed to the -j flag instructs Rails to preconfigure esbuild as the preferred JavaScript bundler.
  * The -c flag specifies the application’s CSS processor. Bootstrap is the preferred option in this case.
  * The -T flag instructs Rails to skip the generation of test files since you won’t be writing tests for this tutorial. This command is also suggested if you want to use a Ruby testing tool different from the one Rails provides.

* Now that the application is connected to a database, start the application by running the following command:

	**bin/dev**

# Step 2 — Installing Frontend Dependencies

  * Run the following command to install these packages with the Yarn package manager:

  **yarn add react react-dom react-router-dom**


* ...
