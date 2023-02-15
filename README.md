# Node.js Kata - ITS Orders

Code [kata](<https://en.wikipedia.org/wiki/Kata_(programming)>) in Node.js where you have to write a report of orders.

## Contents

- [Topic](#topic)
- [Considerations](#frame-conditions)
- [Main tasks](#main-tasks)
- [Optional tasks](#optional-tasks)
- [Procedure](#procedure)

## Topic

We want to write a node app to extract data from csv files which contain order and product data .

## Considerations

Develop your code based on Node.js.

Keep the following priorities in mind while you implementing:

1.  Code quality
2.  Usage of object oriented methods
3.  Functionality

### Main tasks

1. Your app should read all data from the given CSV files into a meaningful data structure/s.

2. Print out all orders (we want order_id & order total)

3. Find an order by its `order_id`.

4. Find all orders by their `customer_email`’.

5. Print out all orders and items sorted by `order_id`.

6. Print out total revenue (Sum of all order totals)

7. Use jest at least to test 1 method

### Optional tasks

> **Hint:** Optional means optional.

1. Write Unit tests for at least another method.

2. Implement an interactive user interface for one or more of the main tasks mentioned above.
   This could be done by a website, on the console, etc.

3. Add a new order to the data structure of your software (via command line or UI) and export it to a new CSV files.

## Procedure

1. Clone this repository with local branch:

```
git clone https://github.com/echocat/its-nodejs-kata.git
git checkout -b run-<yourname>
```

If you want to refactor each iteration you can use

```
git checkout -b run-<yourname>-<iteration number>
# Example: git checkout -b run-candidatename-1
```

2. Open in your favorite IDE.

   > **Hint**: We recommend Visual Studio Code.

3. Happy coding!

## FAQ

##### How to run your application?

```
npm start
```

```
npm lint
```

```
npx jest --coverage
```

### How to run the cli application?

1. Build the app.

```
yarn run build:cli
```

2. Run the cli tool and show help page.

```
node dist/cli.js -h
```

#### Some example commands

```
node dist/cli.js --findByCustomerEmail useremail4@example.com
node dist/cli.js --findByOrderId 12314327
node dist/cli.js -ot
node dist/cli.js -owi

```
