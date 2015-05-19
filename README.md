# FuzzyLogicJS v1.0
FuzzyLogic used for getting crisp values for linguistic variables.
In designing real life games the designers of the gameplay and game AI need to use linguistic 
variables to describe objects and players. For example we have linguistic variables like "speed, 
 ,high etc" to describe for example how fast is a car. In real life if you need fast car 
for races you will get the fastest car possible. For safety driving the kids to school you might 
choose slower car but strong enought to protect you and your family. So how to learn a computer 
to calculate the best option depends on how much a car is desirable for your need?


## Example story
Let's drop the story with the car. We are writing a game AI which will be playing a game with 
space ships and planets. The goal is to conquer the universe. The real planets in the good games 
are with different sizes, earns different resources also they are on a different distance from us.
We are in the middle of a galaxy and we are trying to conquer the universe with thousands of 
galaxies and planets. But we are not alone there are other players which are trying the same thing.
This is a complex task. For my example I will use only the size of the planets (representing 
the profit of colonizing the planet) and distance (representing the cost of colonizing the planet).
So the values like close, average, far are the different Fuzzy Sets. This Fuzzy Sets in a composition
 are representing a Fuzzy linguistic variable distance to that planet. Same for small, medium, big and
 size of the planet. Our choice will depend only on the size and distance to target.

 Defining a module for choosing a planet for attack.
 ------------------------------------------------------

 ```dart
 var AttackModule = function() {

    this.fzmod = new FuzzyModule();
}
```