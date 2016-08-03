# Eruda Util Documentation

## $ 

jQuery like style dom manipulator. TODO

```javascript
var $btn = $('#btn');
$btn.html('eustia');
```

## $attr 

Element attribute manipulation.

Get the value of an attribute for the first element in the set of matched elements.

|Name   |Type                |Desc                            |
|-------|--------------------|--------------------------------|
|element|string array element|Elements to manipulate          |
|name   |string              |Attribute name                  |
|return |string              |Attribute value of first element|

Set one or more attributes for the set of matched elements.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to manipulate|
|name   |string              |Attribute name        |
|value  |string              |Attribute value       |

|Name      |Type                |Desc                                  |
|----------|--------------------|--------------------------------------|
|element   |string array element|Elements to manipulate                |
|attributes|object              |Object of attribute-value pairs to set|

### remove

Remove an attribute from each element in the set of matched elements.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to manipulate|
|name   |string              |Attribute name        |

```javascript
$attr('#test', 'attr1', 'test');
$attr('#test', 'attr1'); // -> test
$attr.remove('#test', 'attr1');
$attr('#test', {
    'attr1': 'test',
    'attr2': 'test'
});
```

## $class 

Element class manipulations.

### add

Add the specified class(es) to each element in the set of matched elements.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to manipulate|
|names  |string array        |Classes to add        |

### has

Determine whether any of the matched elements are assigned the given class.

|Name   |Type                |Desc                                 |
|-------|--------------------|-------------------------------------|
|element|string array element|Elements to manipulate               |
|name   |string              |Class name                           |
|return |boolean             |True if elements has given class name|

### toggle

Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to manipulate|
|name   |string              |Class name to toggle  |

### remove

Remove a single class, multiple classes, or all classes from each element in the set of matched elements.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to manipulate|
|names  |string              |Class names to remove |

```javascript
$class.add('#test', 'class1');
$class.add('#test', ['class1', 'class2']);
$class.has('#test', 'class1'); // -> true
$class.remove('#test', 'class1');
$class.has('#test', 'class1'); // -> false
$class.toggle('#test', 'class1');
$class.has('#test', 'class1'); // -> true
```

## $css 

Element css manipulation.

Get the computed style properties for the first element in the set of matched elements.

|Name   |Type                |Desc                      |
|-------|--------------------|--------------------------|
|element|string array element|Elements to manipulate    |
|name   |string              |Property name             |
|return |string              |Css value of first element|

Set one or more CSS properties for the set of matched elements.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to manipulate|
|name   |string              |Property name         |
|value  |string              |Css value             |

|Name      |Type                |Desc                            |
|----------|--------------------|--------------------------------|
|element   |string array element|Elements to manipulate          |
|properties|object              |Object of css-value pairs to set|

```javascript
$css('#test', {
    'color': '#fff',
    'background': 'black'
});
$css('#test', 'display', 'block');
$css('#test', 'color'); // -> #fff
```

## $data 

Data manipulation TODO

```javascript
$data('#test', 'attr1', 'eustia');
```

## $event 

bind events to certain dom elements. TODO

```javascript
event.on('#test', 'click', function ()
{
    // ...
});
```

## $insert 

Insert html on different position. TODO

```javascript
$insert.append('#test', '<div>test</div>');
```

## $offset 

Get the position of the element in document.

|Name   |Type                |Desc                  |
|-------|--------------------|----------------------|
|element|string array element|Elements to get offset|

```javascript
$offset('#test'); // -> {left: 0, top: 0, width: 0, height: 0}
```

## $property 

Element property html, text, val getter and setter.

### html

Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.

### text

Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

### val

Get the current value of the first element in the set of matched elements or set the value of every matched element.

```javascript
$property.html('#test', 'eris');
$property.html('#test'); // -> eris
```

## $remove 

Remove the set of matched elements from the DOM.

|Name   |Type                |Desc              |
|-------|--------------------|------------------|
|element|string array element|Elements to delete|

```javascript
$remove('#test');
```

## $safeEls 

Convert value into an array, if it's a string, do querySelector.

|Name  |Type                |Desc             |
|------|--------------------|-----------------|
|value |element array string|Value to convert |
|return|array               |Array of elements|

```
$safeEls('.test'); // -> Array of elements with test class
```

## $show 

Show elements.

|Name   |Type                |Desc            |
|-------|--------------------|----------------|
|element|string array element|Elements to show|

```javascript
$show('#test');
```

## Class 

Create JavaScript class.

|Name     |Type    |Desc                             |
|---------|--------|---------------------------------|
|methods  |object  |Public methods                   |
|[statics]|object  |Static methods                   |
|return   |function|Function used to create instances|

```javascript
var People = Class({
    initialize: function (name, age)
    {
        this.name = name;
        this.age = age;
    },
    introduce: function ()
    {
        return 'I am ' + this.name + ', ' + this.age + ' years old.'.
    }
});

var Student = People.extend({
    initialize: function (name, age, school)
    {
        this.callSuper('initialize', name, age);

        this.school = school.
    },
    introduce: function ()
    {
        return this.callSuper('introduce') + '\n I study at ' + this.school + '.'.
    }
}, {
    is: function (obj)
    {
        return obj instanceof Student;
   }
});

var a = new Student('allen', 17, 'Hogwarts');
a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
Student.is(a); // -> true
```

## Emitter 

TODO

## Select 

Simple wrapper of querySelectorAll to make dom selection easier.

### Constructor

|Name    |Type  |Desc               |
|--------|------|-------------------|
|selector|string|Dom selector string|

```javascript
var test = new Select('#test');
```

## allKeys 

Retrieve all the names of object's own and inherited properties.

|Name  |Type  |Desc                       |
|------|------|---------------------------|
|obj   |object|Object to query            |
|return|array |Array of all property names|

> Members of Object's prototype won't be retrieved.

```javascript
var obj = Object.create({zero: 0});
obj.one = 1;
allKeys(obj) // -> ['zero', 'one']
```

## camelCase 

Convert string to "camelCase".

|Name  |Type  |Desc              |
|------|------|------------------|
|str   |string|String to convert |
|return|string|Camel cased string|

```javascript
camelCase('foo-bar'); // -> fooBar
camelCase('foo bar'); // -> fooBar
camelCase('foo_bar'); // -> fooBar
camelCase('foo.bar'); // -> fooBar
```

## contain 

Check if the value is present in the list.

|Name  |Type   |Desc                                |
|------|-------|------------------------------------|
|array |array  |Target list                         |
|value |*      |Value to check                      |
|return|boolean|True if value is present in the list|

```javascript
contain([1, 2, 3], 1); // -> true
```

## cookie 

Simple api for handling browser cookies.

### get

Get cookie value.

|Name  |Type  |Desc                      |
|------|------|--------------------------|
|key   |string|Cookie key                |
|return|string|Corresponding cookie value|

### set

Set cookie value.

|Name     |Type   |Desc          |
|---------|-------|--------------|
|key      |string |Cookie key    |
|val      |string |Cookie value  |
|[options]|object |Cookie options|
|return   |exports|Module cookie |

### remove

Remove cookie value.

|Name     |Type   |Desc          |
|---------|-------|--------------|
|key      |string |Cookie key    |
|[options]|object |Cookie options|
|return   |exports|Module cookie |

```javascript
cookie.set('a', '1', {path: '/'});
cookie.get('a'); // -> '1'
cookie.remove('a');
```

## createAssigner 

Used to create extend, extendOwn and defaults.

|Name    |Type    |Desc                          |
|--------|--------|------------------------------|
|keysFn  |function|Function to get object keys   |
|defaults|boolean |No override when set to true  |
|return  |function|Result function, extend...    |

## defaults 

Fill in undefined properties in object with the first value present in the following list of defaults objects.

|Name  |Type  |Desc              |
|------|------|------------------|
|obj   |object|Destination object|
|*src  |object|Sources objects   |
|return|object|Destination object|

```javascript
defaults({name: 'RedHood'}, {name: 'Unknown', age: 24}); // -> {name: 'RedHood', age: 24}
```

## delegate 

TODO

## each 

Iterates over elements of collection and invokes iteratee for each element.

|Name    |Type        |Desc                          |
|--------|------------|------------------------------|
|obj     |object array|Collection to iterate over    |
|iteratee|function    |Function invoked per iteration|
|[ctx]   |*           |Function context              |

```javascript
each({'a': 1, 'b': 2}, function (val, key) {});
```

## endWith 

Check if string ends with the given target string.

|Name  |Type   |Desc                           |
|------|-------|-------------------------------|
|str   |string |The string to search           |
|suffix|string |String suffix                  |
|return|boolean|True if string ends with target|

```javascript
endWith('ab', 'b'); // -> true
```

## escape 

Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.

|Name  |Type  |Desc            |
|------|------|----------------|
|str   |string|String to escape|
|return|string|Escaped string  |

```javascript
escape('You & Me'); -> // -> 'You &amp; Me'
```

## escapeRegExp 

Escape special chars to be used as literals in RegExp constructors.

|Name  |Type  |Desc            |
|------|------|----------------|
|str   |string|String to escape|
|return|string|Escaped string  |

```javascript
escapeRegExp('[eris]'); // -> '\\[eris\\]'
```

## evalCss 

No documentation.

## extend 

Copy all of the properties in the source objects over to the destination object.

|Name  |Type  |Desc              |
|------|------|------------------|
|obj   |object|Destination object|
|*src  |object|Sources objects   |
|return|object|Destination object|

```javascript
extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
```

## extendOwn 

Like extend, but only copies own properties over to the destination object.

|Name  |Type  |Desc              |
|------|------|------------------|
|obj   |object|Destination object|
|*src  |object|Sources objects   |
|return|object|Destination object|

```javascript
extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
```

## filter 

Iterates over elements of collection, returning an array of all the values that pass a truth test.

|Name     |Type    |Desc                                   |
|---------|--------|---------------------------------------|
|obj      |array   |Collection to iterate over             |
|predicate|function|Function invoked per iteration         |
|[ctx]    |*       |Predicate context                      |
|return   |array   |Array of all values that pass predicate|

```javascript
filter([1, 2, 3, 4, 5], function (val)
{
    return val % 2 === 0;
}); // -> [2, 4]
```

## get 

No documentation.

## getFileName 

No documentation.

## has 

Checks if key is a direct property.

|Name  |Type   |Desc                            |
|------|-------|--------------------------------|
|obj   |object |Object to query                 |
|key   |string |Path to check                   |
|return|boolean|True if key is a direct property|

```javascript
has({one: 1}, 'one'); // -> true
```

## identity 

Return the first argument given.

|Name  |Type|Desc       |
|------|----|-----------|
|val   |*   |Any value  |
|return|*   |Given value|

```javascript
identity('a'); // -> 'a'
```

## idxOf 

Get the index at which the first occurrence of value. TODO

|Name       |Type  |Desc                |
|-----------|------|--------------------|
|arr        |array |Array to search     |
|val        |*     |Value to search for |
|[fromIdx=0]|number|Index to search from|

```javascript
idxOf([1, 2, 1, 2], 2, 2); // -> 3
```

## inherits 

Inherit the prototype methods from one constructor into another.

|Name      |Type    |Desc       |
|----------|--------|-----------|
|Class     |function|Child Class|
|SuperClass|function|Super Class|

```javascript
function People(name)
{
    this._name = name;
}
People.prototype = {
    getName: function ()
    {
        return this._name;
    }
};
function Student(name)
{
    this._name = name;
}
inherits(Student, People);
var s = new Student('RedHood');
s.getName(); // -> 'RedHood'
```

## isArgs 

Check if value is classified as an arguments object.

|Name  |Type   |Desc                                |
|------|-------|------------------------------------|
|value |*      |Value to check                      |
|return|boolean|True if value is an arguments object|

```javascript
(function () {
    isArgs(arguments); // -> true
})();
```

## isArr 

Check if value is an `Array` object.

|Name  |Type   |Desc                              |
|------|-------|----------------------------------|
|val   |*      |The value to check                |
|return|boolean|True if value is an `Array` object|

```javascript
isArr([]); // -> true
isArr({}); // -> false
```

## isArrLike 

Check if value is array-like.

|Name  |Type   |Desc                       |
|------|-------|---------------------------|
|value |*      |Value to check             |
|return|boolean|True if value is array like|

```javascript
isArrLike('test'); // -> true
isArrLike(document.body.children); // -> true;
isArrLike([1, 2, 3]); // -> true
```

## isBool 

Check if value is a boolean primitive.

|Name  |Type   |Desc                      |
|------|-------|--------------------------|
|val   |*      |Value to check            |
|return|boolean|True if value is a boolean|

```javascript
isBool(true); // -> true
isBool(false); // -> true
isBool(1); // -> false
```

## isCrossOrig 

No documentation.

## isEl 

Check if value is a DOM element.

|Name  |Type   |Desc                          |
|------|-------|------------------------------|
|val   |*      |Value to check                |
|return|boolean|True if value is a DOM element|

```javascript
isEl(document.body); // -> true
```

## isEmpty 

Check if value is an empty object or array.

|Name  |Type   |Desc                  |
|------|-------|----------------------|
|val   |*      |Value to check        |
|return|boolean|True if value is empty|

```javascript
isEmpty([]); // -> true
isEmpty({}); // -> true
```

## isErr 

Check if value is an error.

|Name  |Type   |Desc                     |
|------|-------|-------------------------|
|val   |*      |Value to check           |
|return|boolean|True if value is an error|

```javascript
isErr(new Error()); // -> true
```

## isErudaEl 

No documentation.

## isFn 

Check if value is a function.

|Name  |Type   |Desc                       |
|------|-------|---------------------------|
|val   |*      |Value to check             |
|return|boolean|True if value is a function|

Generator function is also classified as true.

```javascript
isFn(function() {}); // -> true
isFn(function*() {}); // -> true
```

## isMatch 

Check if keys and values in src are contained in obj.

|Name  |Type   |Desc                              |
|------|-------|----------------------------------|
|obj   |object |Object to inspect                 |
|src   |object |Object of property values to match|
|return|boolean|True if object is match           |

```javascript
isMatch({a: 1, b: 2}, {a: 1}); // -> true
```

## isNum 

Checks if value is classified as a Number primitive or object.

|Name  |Type   |Desc                                 |
|------|-------|-------------------------------------|
|value |*      |Value to check                       |
|return|boolean|True if value is correctly classified|

## isObj 

Check if value is the language type of Object.

|Name  |Type   |Desc                      |
|------|-------|--------------------------|
|val   |*      |Value to check            |
|return|boolean|True if value is an object|

[Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)

```javascript
isObj({}); // -> true
isObj([]); // -> true
```

## isRegExp 

Check if value is a regular expression.

|Name  |Type   |Desc                                 |
|------|-------|-------------------------------------|
|val   |*      |Value to check                       |
|return|boolean|True if value is a regular expression|

```javascript
isRegExp(/a/); // -> true
```

## isStr 

Check if value is a string primitive.

|Name  |Type   |Desc                               |
|------|-------|-----------------------------------|
|val   |*      |Value to check                     |
|return|boolean|True if value is a string primitive|

```javascript
isStr('eris'); // -> true
```

## isUndef 

Check if value is undefined.

|Name  |Type   |Desc                      |
|------|-------|--------------------------|
|val   |*      |Value to check            |
|return|boolean|True if value is undefined|

```javascript
isUndef(void 0); // -> true
isUndef(null); // -> false
```

## kebabCase 

Convert string to "kebabCase".

|Name  |Type  |Desc              |
|------|------|------------------|
|str   |string|String to convert |
|return|string|Kebab cased string|

```javascript
kebabCase('fooBar'); // -> foo-bar
kebabCase('foo bar'); // -> foo-bar
kebabCase('foo_bar'); // -> foo-bar
kebabCase('foo.bar'); // -> foo-bar
```

## keys 

Create an array of the own enumerable property names of object.

|Name  |Type  |Desc                   |
|------|------|-----------------------|
|obj   |object|Object to query        |
|return|array |Array of property names|

## last 

Get the last element of array.

|Name  |Type |Desc                     |
|------|-----|-------------------------|
|arr   |array|The array to query       |
|return|*    |The last element of array|

```javascript
last([1, 2]); // -> 2
```

## loadJs 

Inject script tag into page with given src value. TODO

## ltrim 

Remove chars or white-spaces from beginning of string.

|Name  |Type        |Desc              |
|------|------------|------------------|
|str   |string      |String to trim    |
|chars |string array|Characters to trim|
|return|string      |Trimmed string    |

```javascript
ltrim(' abc  '); // -> 'abc  '
ltrim('_abc_', '_'); // -> 'abc_'
ltrim('_abc_', ['a', '_']); // -> 'bc_'
```

## map 

Create an array of values by running each element in collection through iteratee.

|Name    |Type        |Desc                          |
|--------|------------|------------------------------|
|obj     |array object|Collection to iterate over    |
|iteratee|function    |Function invoked per iteration|
|[ctx]   |*           |Function context              |
|return  |array       |New mapped array              |

```javascript
map([4, 8], function (n) { return n * n; }); // -> [16, 64]
```

## matcher 

TODO

## noop 

A no-operation function.

```javascript
noop(); // Does nothing
```

## now 

Gets the number of milliseconds that have elapsed since the Unix epoch.

```javascript
now(); // -> 1468826678701
```

## objToStr 

Alias of Object.prototype.toString.

|Name  |Type  |Desc                                |
|------|------|------------------------------------|
|value |*     |Source value                        |
|return|string|String representation of given value|

```javascript
objToStr(5); // -> '[object Number]'
```

## optimizeCb 

TODO

## orientation 

No documentation.

## pxToNum 

No documentation.

## rtrim 

Remove chars or white-spaces from end of string.

|Name  |Type        |Desc              |
|------|------------|------------------|
|str   |string      |String to trim    |
|chars |string array|Characters to trim|
|return|string      |Trimmed string    |

```javascript
rtrim(' abc  '); // -> ' abc'
rtrim('_abc_', '_'); // -> '_abc'
rtrim('_abc_', ['c', '_']); // -> '_ab'
```

## safeCb 

Create callback based on input value. TODO

## slice 

TODO

## some 

Check if predicate return truthy for any element.

|Name     |Type        |Desc                                          |
|---------|------------|----------------------------------------------|
|obj      |array object|Collection to iterate over                    |
|predicate|function    |Function to invoked per iteration             |
|ctx      |*           |Predicate context                             |
|return   |boolean     |True if any element passes the predicate check|

```javascript
some([2, 5], function (val)
{
    return val % 2 === 0;
}); // -> true
```

## splitCase 

Split different string case to an array.

|Name  |Type  |Desc           |
|------|------|---------------|
|str   |string|String to split|
|return|array |Result array   |

```javascript
splitCase('foo-bar'); // -> ['foo', 'bar']
splitCase('foo bar'); // -> ['foo', 'bar']
splitCase('foo_bar'); // -> ['foo', 'bar']
splitCase('foo.bar'); // -> ['foo', 'bar']
splitCase('fooBar'); // -> ['foo', 'bar']
splitCase('foo-Bar'); // -> ['foo', 'bar']
```

## startWith 

Check if string starts with the given target string.

|Name  |Type   |Desc                             |
|------|-------|---------------------------------|
|str   |string |String to search                 |
|prefix|string |String prefix                    |
|return|boolean|True if string starts with prefix|

```javascript
startWith('ab', 'a'); // -> true
```

## toArr 

Convert value to an array.

|Name  |Type |Desc            |
|------|-----|----------------|
|val   |*    |Value to convert|
|return|array|Converted array |

```javascript
toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
toArr('abc'); // -> ['abc']
toArr(1); // -> []
toArr(null); // -> []
```

## toNum 

Convert value to a number.

|Name  |Type  |Desc            |
|------|------|----------------|
|val   |*     |Value to process|
|return|number|Resulted number |

```javascript
toNum('5'); // -> 5
```

## toStr 

Convert value to a string.

|Name  |Type  |Desc            |
|------|------|----------------|
|val   |*     |Value to convert|
|return|string|Resulted string |

```javascript
toStr(null); // -> ''
toStr(1); // -> '1'
toStr(false); // -> 'false'
toStr([1, 2, 3]); // -> '1,2,3'
```

## trim 

Remove chars or white-spaces from beginning end of string.

|Name  |Type        |Desc              |
|------|------------|------------------|
|str   |string      |String to trim    |
|chars |string array|Characters to trim|
|return|string      |Trimmed string    |

```javascript
trim(' abc  '); // -> 'abc'
trim('_abc_', '_'); // -> 'abc'
trim('_abc_', ['a', 'c', '_']); // -> 'b'
```

## uniqId 

Generate a globally-unique id.

|Name  |Type  |Desc              |
|------|------|------------------|
|prefix|string|Id prefix         |
|return|string|Globally-unique id|

```javascript
uniqueId('eusita_'); // -> 'eustia_xxx'
```

## unique 

Create duplicate-free version of an array.

|Name     |Type    |Desc                         |
|---------|--------|-----------------------------|
|arr      |array   |Array to inspect             |
|[compare]|function|Function for comparing values|
|return   |array   |New duplicate free array     |

```javascript
unique([1, 2, 3, 1]); // -> [1, 2, 3]
```

## upperFirst 

Convert the first character of string to upper case.

|Name  |Type  |Desc             |
|------|------|-----------------|
|str   |string|String to convert|
|return|string|Converted string |

```javascript
upperFirst('red'); // -> RED
```

## values 

Creates an array of the own enumerable property values of object.

|Name  |Type  |Desc                    |
|------|------|------------------------|
|obj   |object|Object to query         |
|return|array |Array of property values|

```javascript
values({one: 1, two: 2}); // -> [1, 2]
```
