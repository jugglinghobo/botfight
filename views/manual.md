# manual

Writing a bot is very easy. The only thing standing between you and your bot is a little bit of [javascript](http://www.w3schools.com/js/DEFAULT.asp).

In this manual, we'll create a very simple bot to help you understand the basics of bot programming with javascript.

### 1. overview
A bot consists of multiple modules:

* __brain__: controls the bot, and decides what action to take based on the current surroundings.
* __motion system__: executes orders for moving around.
* __weapon system__: executes orders for attacking.

You are responsible for the brain, which currently looks like this:

```javascript
action = function(surroundings) {
  // implement this functionality...
  return null;
};
```

This might look confusing at first, but you can imagine it like this:

When the bot needs to decide what to do next, it will ask it's brain __Hey brain, what's the next action for those__ `surroundings` __here?__,
and the brain says: `null`.

This means there will be no action at all. To change this, we will make the bot move in one direction. (surroundings are covered in [4. surroundings](#label-4.+surroundings)).

### 2. movement

bots can move in four directions: `"up"`, `"down"`, `"left"` and `"right"`.
To make the bot move up, we will change the return statement in our action to `return {"action": "move", "direction": "up"}`.

Our action function now looks like this:

```javascript
action = function(surroundings) {
  return {"action": "move", "direction": "up"};
};
```

When the bot now asks the brain __Hey brain, what's the next__ `action` __for those__ `surroundings` __here?__,
the response will be __move up one tile__.

### 3. attacking

Attacking is very much the same thing as moving, except the action is now `"attack"` instead of `"move"`.

To attack anything that's left of us, we return `{"action": "attack", "direction": "left"}`.

The full action function would look like this:

```javascript
action = function(surroundings) {
  return {"action": "attack", "direction": "left"};
};
```

### 4. surroundings

Moving around like a dumb bot and attacking if nothing is there doesn't make a lot of sense of course, and this is where the `surroundings` come into play.

```javascript
action = function(surroundings) {
...
```

Do you see the `surroundings` thing in the brackets? This gets passed to the brain when it's asked for the next action,
and we can change the action based on our surroundings.
`surroundings` holds information about our surroundings (duh) and looks like this:

```javascript
{
  "up": occupied?,
  "down": occupied?,
  "left": occupied?,
  "right": occupied?
}
```

The value of `occupied?` will be either `true` or `false`, depending on wether something is there or not. This is useful because it can be used directly in [if..else conditions](http://www.w3schools.com/js/js_if_else.asp) for returning a different action based on a condition.

For example, we can test if something is next to us as follows:

```javascript
// test if something is to the left of us
if (surroundings.left) {
  // there is something to the left of us
} else {
  // there is nothing to the left of us
};
```

### 5. movement and attacking based on surroundings

With our current knowledge, we can combine movement and attacking. The next code will execute an attack to the left if something is there, else it will move down.

```javascript
action = function(surroundings) {
  if (surroundings.left) {
    return {"action": "attack", "direction": "left"};
  } else {
    return {"action": "move", "direction": "down"};
  };
}
```

### 6. moving in multiple directions

Moving in only one direction is very boring. To move around in a circle, use this (explained below):

```javascript
// make an array with all possible directions (array is like a list).
var directions = ["up", "left", "down", "right"];

// the index that gives us the direction out of the directions array,
// example directions[2] gives us the direction at the 3. place in the array.
// ATTENTION: array is zero-based, which means the first thing in directions is at
// directions[0].
var directionIndex = 0;

action = function(surroundings) {
  // get the direction out of the directions array.
  var currentDirection = directions[directionIndex];

  // increment the index to get the next direction in the array the next time we use it.
  directionIndex = directionIndex + 1;

  // reset the directionIndex if we have reached the last item of the array.
  // this is necessary because if we wanted to get the 5. item out of the array
  // (with directions[4]), this would cause an error because there are only 4 item
  // in the array.
  if (directionIndex > 3) {
    directionIndex = 0;
  }

  // use the currentDirection variable as the direction
  return {"action": "move", "direction": currentDirection};
}
```
Explanation line by line:


```javascript
var directions = ["up", "left", "down", "right"];
```
We define a variable that holds all possible directions. This is done with the `var` keyword.

---

```javascript
var directionIndex = 0;
```
We define a second variable, which is used as an index.

Both those variables are defined outside of the `action` function. If we would define them inside, they would be reset everytime the `action` function is called.
This means that every time we ask what action to execute, `directionIndex` would be set to `0`. This would be a problem because...

---

```javascript
action = function(surroundings) {
  ...
  var currentDirection = directions[directionIndex];
  ...
}
```

The line `var currentDirection = directions[directionIndex]` uses the `directionIndex` variable to retrieve one of the elements out of the `directions` array and stores the retrieved direction in the `currentDirection` variable. Here are all possible outcomes of this line:

```javascript
var directions = ["up", "left", "down", "right"];

var directionIndex = 0;
action = function(surroundings) {
  var currentDirection = directions[directionIndex]; // currentDirection is "up"
}

var directionIndex = 1;
action = function(surroundings) {
  var currentDirection = directions[directionIndex]; // currentDirection is "left"
}

var directionIndex = 2;
action = function(surroundings) {
  var currentDirection = directions[directionIndex]; // currentDirection is "down"
}

var directionIndex = 3;
action = function(surroundings) {
  var currentDirection = directions[directionIndex]; // currentDirection is "right"
}
```
---

```javascript
action = function(surroundings) {
  ...
  directionIndex = directionIndex + 1;
  ...
}
```
Here, we increment the `directionIndex` by one. This ensures that the line `var currentDirection = directions[directionIndex]`
returns the next direction in the array, as seen above.

---

```javascript
action = function(surroundings) {
  ...
  if (directionIndex > 3) {
    directionIndex = 0;
  }
  ...
}
```
This condition checks if our `directionIndex` is bigger than the size of our array. If if is, this means we have reached
the last item in our array (`"right"` in this case) and we have to reset the index to avoid an error. If we wouldn't reset the index,
the line `var currentDirection = directions[directionIndex]` would try to retrieve and item at position 4, which does not exist,
and this would cause an error.

---

```javascript
action = function(surroundings) {
  ...
  return {"action": "move", "direction": currentDirection};
  ...
}
```
On the last line, we return our action. In this case, we want to `"move"`, and the direction is whatever we have stored in the `currentDirection`
variable previously.
