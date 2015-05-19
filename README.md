FuzzyLogicJS v1.0
=================
FuzzyLogic used for getting crisp values for linguistic variables.
In designing real life games the designers of the gameplay and game AI need to use linguistic 
variables to describe objects and players. For example we have linguistic variables like "speed, 
 ,high etc" to describe for example how fast is a car. In real life if you need fast car 
for races you will get the fastest car possible. For safety driving the kids to school you might 
choose slower car but strong enought to protect you and your family. So how to learn a computer 
to calculate the best option depends on how much a car is desirable for your need? With FuzzyModule
you can give it a try.


Example story
=============
Let's drop the story with the car. We are writing a game AI which will be playing a game with 
space ships and planets. The goal is to conquer the universe. The real planets in the good games 
are with different sizes, earns different resources also they are on a different distance from us.
We are in the middle of a galaxy and we are trying to conquer the universe with thousands of 
galaxies and planets. But we are not alone there are other players which are trying the same thing.
This is a complex task. For my example I will use only the size of the planets (representing 
the profit of colonizing the planet) and distance (representing the cost of colonizing the planet).

Usage
=====

Defining a module for choosing a planet for attack.
---------------------------------------------------
 You only need to create an instance of FuzzyModule.

```dart
var FuzzyModule = require('./FuzzyModule');

var AttackModule = function() {

    this.fzmod = new FuzzyModule();
}
```

Define a linguistic variables
-----------------------------
So the values like close, average, far are the different Fuzzy Sets. This Fuzzy Sets in a composition
 are representing a Fuzzy linguistic variable distance to that planet. Same for small, medium, big and
 size of the planet. Our choice will depend only on the size and distance to target. Fuzzy Sets are also
 called fuzzy terms.

 Using ```FuzzyModule.createFLV("name of FLV")``` you can create as many as you want linguistic
 variables.

```dart
this.distanceFLV = this.fzmod.createFLV("distance");

this.close_to_target = this.distanceFLV.addLeftShoulderSet("close", 0, 9000, 40000);
this.average_to_target = this.distanceFLV.addTriangleSet("average", 9000, 40000, 60000);
this.far_to_target = this.distanceFLV.addRightShoulderSet("far", 40000, 60000, 400000);

this.sizeFLV = this.fzmod.createFLV("size");

this.small_target = this.sizeFLV.addLeftShoulderSet("small", 1, 3, 6);
this.medium_target = this.sizeFLV.addTriangleSet("medium", 3, 6, 8);
this.big_target = this.sizeFLV.addRightShoulderSet("big", 6, 8, 10);
```

Here is the time when we notice that fuzzy sets and fuzzy linguistic variables are very
comfortable to express human's assessment when making a decision. It depends on many things with different values depends on what the values measures.


Is up to us to chose the member function of our fuzzy set. The member function is defined by the bounds
of the set and it's shape. Most used are triangle and trapezoid sets. In distance we choose left
shoulder set for close_to_target so when is very close (< 9000) we get maximum degree of membership.
When is between 9000 and 40000 the degree of membership for close_to_target goes down, but the degree of
membership of average_to_target goes up. To achieve a good assessment you need to use good
numbers. This depends on the values that the game uses in its own logic and your own assessment.
In the distance we use big numbers because in the space distances between two planets are very
big even measured in light years. And our assessment tells us the values of the bounds for this sets. Where close_to_target begins and ends, and when the average_to_target starts and ends etc.. 


NOTE:
-----
When you are defining your Fuzzy Sets for a given linguistic variable, make sure that the bounds of each
set (except the left bound of the first and the right bound of the last) to be exactly the peak point
of their neighbours. For example the left bound of ```close_to_target = 0``` because it is the first.
But it's right bound is ```40000``` which is exactly the peak point of his rigth neighbour. For 
```average_to_target``` we have left bound ```9000``` which is the peak point of his left neighbour 
```close_to_target``` and the right bound ```60000``` which is the peak point of the his right neighbour ```far_to_target```.

We almost define all the variables we need. With the same method we can define linguistic
variable to measure the choice of our planet. Simply add one more variable called desirability.
You can choose another name but this seems most accurate to me in the case of chosing planet
to attack.

```dart
this.desirabilityFLV = this.fzmod.createFLV("desirability");

this.undesirable = this.desirabilityFLV.addLeftShoulderSet("undesirable", 0, 30, 50);
this.desirable = this.desirabilityFLV.addTriangleSet("desirable", 30, 50, 70);
this.very_desirable = this.desirabilityFLV.addRightShoulderSet("very_desirable", 50, 70, 100);
```
Later we will use this variable to get crisp value of the choice.


Declaring rules
---------------
This is most important thing in getting accurate crisp value of choice. Here we need to be 
careful to make our rules accurate and expressive so they can represent our judgment over
linguistic variables. The exact termin is difference with fuzzy rules.

The rules are using Fuzzy Terms which are like Fuzzy Sets. However we want to use our sets many times
and we don't want to change them, so we need new instances and simply make new instances which inherits
our sets. Let's call them FuzzyTerms. Also we need a new Terms for each planet when making the difference
with rules. That's why we need a function to call every time we need to get a crisp value for some planet.

Using another method from FuzzyModule ``` FuzzyModule.addRule(antecedent, consequent)``` . 
The rules can be written like:  ```IF antecedent THEN consequent``` . I am not 
going to get deep in what means antecedent and consequent but the antecedent is the condition in
in the IF statement and the consequent describes what is the consequence if the condition is satisfied.
So for antecedent we will use linguistic variables and composition of them with operators like
```AND``` and ```OR``` over them. Simply because linguistic variables are nothing more than composition of sets
this operators are nothing more than operations with sets where ```AND``` is corresponding to ```intersection``` and ```OR``` is 
corresponding to ```union``` of two sets. For this example I will use only the ```AND``` operator.


```dart
this.declareRules = function() {
    var close = this.fzmod.makeNewFuzzyTerm(this.close_to_target);
    var average = this.fzmod.makeNewFuzzyTerm(this.average_to_target);
    var far = this.fzmod.makeNewFuzzyTerm(this.far_to_target);

    var small = this.fzmod.makeNewFuzzyTerm(this.small_target);
    var medium = this.fzmod.makeNewFuzzyTerm(this.medium_target);
    var big = this.fzmod.makeNewFuzzyTerm(this.big_target);

    var desirable = this.fzmod.makeNewFuzzyTerm(this.desirable);
    var undesirable = this.fzmod.makeNewFuzzyTerm(this.undesirable);
    var very_desirable = this.fzmod.makeNewFuzzyTerm(this.very_desirable);

    this.fzmod.addRule(close.fzAndWith(small), desirable);
    this.fzmod.addRule(close.fzAndWith(medium), desirable);
    this.fzmod.addRule(close.fzAndWith(big), very_desirable);

    this.fzmod.addRule(average.fzAndWith(small), undesirable);
    this.fzmod.addRule(average.fzAndWith(medium), desirable);
    this.fzmod.addRule(average.fzAndWith(big), very_desirable);

    this.fzmod.addRule(far.fzAndWith(small), undesirable);
    this.fzmod.addRule(far.fzAndWith(medium), undesirable);
    this.fzmod.addRule(far.fzAndWith(big), desirable);
};
```

Here I need to say that ```fzAndWith``` and ```fzOrWith``` are methods of FuzzyTerms and this operations
are calculated in the time we declaring (adding) the rules to our module. This is another reason why we
should use a function to do this. When the methods of ```AND``` and ```OR``` are called in our rules the
antecedents are represented by simple FuzzyTerm so we can use ```IF condition THEN consequence``` .


Fuzzify & DeFuzzify
-------------------

Now we have almost done with our preparation work to make a computer making a decision for us. 
We only need to Fuzzify the linguistic variables with the crisp values for a given planet, and then
DeFuzzify the desirability linguistic variable or with other words to get the crisp value of choice.

So how to achive our goal.
Using the ```FuzzyModule.fuzzify(FLV, value)``` where ```FLV``` is a Fuzzy linguistic variable and the 
```value``` is the crisp value of the variable for that given planet that we are "analyzing" and 
fuzzifying our crisp value of linguistic variable. With ```FuzzyModule.deFuzzify(FLV)``` we can get the crisp value from our fuzzified sets and differenced rules.


For the same reasons in the above chapter where we declare our rules we need to fuzzify and defuzzify
in a function for each planet we want to analyze. Also after fuzzifing and before defuzzifing we need to
declare our rules because the rules have sense only when differenced with a terms from fuzzified sets for a given value.

```dart
    this.getCrispValue = function(distance, size) {
        this.fzmod.fuzzify("distance", distance);
        this.fzmod.fuzzify("size", size);
        this.declareRules();
        return this.fzmod.deFuzzify("desirability");
    };
```
So this methods gives us a crisp value of desirability for a given planet values (distance and size).
If we make this for a thousand planets the planet with biggest value of desirability will be our choice.

In a result we have an AttackModule for our AI which will conquer the universe.

```dart
var FuzzyModule = require('./FuzzyModule');

var AttackModule = function() {

    this.fzmod = new FuzzyModule();

    this.distanceFLV = this.fzmod.createFLV("distance");

    this.close_to_target = this.distanceFLV.addLeftShoulderSet("close", 0, 9000, 40000);
    this.average_to_target = this.distanceFLV.addTriangleSet("average", 9000, 40000, 60000);
    this.far_to_target = this.distanceFLV.addRightShoulderSet("far", 40000, 60000, 400000);

    this.sizeFLV = this.fzmod.createFLV("size");

    this.small_target = this.sizeFLV.addLeftShoulderSet("small", 1, 3, 6);
    this.medium_target = this.sizeFLV.addTriangleSet("medium", 3, 6, 8);
    this.big_target = this.sizeFLV.addRightShoulderSet("big", 6, 8, 10);

    this.desirabilityFLV = this.fzmod.createFLV("desirability");

    this.undesirable = this.desirabilityFLV.addLeftShoulderSet("undesirable", 0, 30, 50);
    this.desirable = this.desirabilityFLV.addTriangleSet("desirable", 30, 50, 70);
    this.very_desirable = this.desirabilityFLV.addRightShoulderSet("very_desirable", 50, 70, 100);

    this.declareRules = function() {
        var close = this.fzmod.makeNewFuzzyTerm(this.close_to_target);
        var average = this.fzmod.makeNewFuzzyTerm(this.average_to_target);
        var far = this.fzmod.makeNewFuzzyTerm(this.far_to_target);

        var small = this.fzmod.makeNewFuzzyTerm(this.small_target);
        var medium = this.fzmod.makeNewFuzzyTerm(this.medium_target);
        var big = this.fzmod.makeNewFuzzyTerm(this.big_target);

        var desirable = this.fzmod.makeNewFuzzyTerm(this.desirable);
        var undesirable = this.fzmod.makeNewFuzzyTerm(this.undesirable);
        var very_desirable = this.fzmod.makeNewFuzzyTerm(this.very_desirable);

        this.fzmod.addRule(close.fzAndWith(small), desirable);
        this.fzmod.addRule(close.fzAndWith(medium), desirable);
        this.fzmod.addRule(close.fzAndWith(big), very_desirable);

        this.fzmod.addRule(average.fzAndWith(small), undesirable);
        this.fzmod.addRule(average.fzAndWith(medium), desirable);
        this.fzmod.addRule(average.fzAndWith(big), very_desirable);

        this.fzmod.addRule(far.fzAndWith(small), undesirable);
        this.fzmod.addRule(far.fzAndWith(medium), undesirable);
        this.fzmod.addRule(far.fzAndWith(big), desirable);
    };

    this.getCrispValue = function(distance, size) {
        this.fzmod.fuzzify("distance", distance);
        this.fzmod.fuzzify("size", size);
        this.declareRules();
        return this.fzmod.deFuzzify("desirability");
    };

}

var a = new AttackModule();
console.log(a.getCrispValue(47900, 5));
```