# hashmap

Practice for learning how hash maps and hash sets work behind the scenes by building each object from scratch with
the same or similar functionality as the built in HashMap and HashSet object. Just as in the built objects, the
insert, get, and delete methods have a time complexity of O(1) at best. To handle collisions I decided to use a
linked list making the time complexity O(n) at worst. There is no gui, instead the hash map and hash set are
displayed in the console.

Live Demo: https://worriorbeast.github.io/hashmap/

Objective:

1. Create a HashMap object with the following methods:
   -  hash(key) takes a key and produces a hash code with it
   -  set(key, value) takes two arguments: the first is a key, and the second is a value that is assigned to this
      key. If a key already exists, then the old value is overwritten
   -  get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not
      found, return null
   -  has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash
      map
   -  remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with
      that key and return true. If the key is not in the hash map, it should return false
   -  length() returns the number of stored keys in the hash map
   -  clear() removes all entries in the hash map
   -  keys() returns an array containing all the keys inside the hash map
   -  values() returns an array containing all the values
   -  entries() returns an array that contains each key, value pair
2. A load factor variable should be included hash map
3. A capacity variable should be included in the hash map

Optional:

1. Create a HashSet Object that behaves the same as a HashMap but only contains keys with no values

What I learned:

Getting started was a bit confusing because I was not sure what a good hash function contains to prevent collisions,
but after not heeding the warning about going into a very deep rabbit hole to learn about hashing, I found out
there is no way to prevent collisions. Instead, collisions can be reduced by iterating through a string to multiply
the previously calculated hash code against a prime number then add the unicode of the character. Adding the unicode
of the character after multiplying helps to reduce duplicate hash codes resulting in less collisions In order to
prevent the hash code from becoming a BigInt I decided to use the MOD operator on each iteration. The final result
becomes the index for the hash map and hash set. Since the final result is the index, it has become clear why
inserting, retrieving, and deleting has an average time complexity of O(n).

I have known properties are very important, but this practice has emphasized how important properties are. In both
HashMap and HashSet classes you will observe a property name size. This property is not named above because
including the size property is not mandatory nor optional. I decided to add the size property because I noticed I
had to create the length() method to return the amount of keys or key value pairs in the object. At first I thought
about filtering all empty indexes and count how many indexes are not empty, but there's an issue with that. Since
I am using a linked list to handle collisions, it is guaranteed the linked list has at least two keys or key value
pairs. Instead of getting the length of the linked list, the count would increment by one. For this reason I decided
to add the size property to keep track when inserting or remove. The property also helps with performance. In the
event we have a hash map or hash set the size of ten thousand or more, we can get the property with O(1) instead
of having to iterate through the entire object every time the length() method is called.

An unexpected issue I ran into was a built-in method being called instead of a method from the LinkedList class.
After some research I learned that built-in methods have precedence over custom methods with the same name and a
javascript feature called prototypal inheritance. When a method is called, javascript searches that method on the
top floor and keeps checking in the floors below until reaching the ground floor where the prototypal chain ends. If
the method being called cannot be found, null is reached. An easy fix is by changing the name of the custom method.
