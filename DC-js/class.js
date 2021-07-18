'use strict';
// Object-oriented programing

// Class: template
// object: instance of a class

// Javascript classes
// - Introduced in. S6
// - Syntactical sugar over prototype-based inheritance 

// 1. Class declarations
class Person{
    //constructor 생성자 
    constructor(name, age){
        //fields
        this.name = name;
        this.age = age;
    }
    //methods
    speak(){
        console.log(`${this.name}: hello!`);
    }
}

const ellie = new Person(`ellie`, 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speak();

// 2. Getter and setters
class User{
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get age(){
        return this._age;
    }
    set age(value){
        // if(value<0){
        //     throw Error('age can not be negative');
        // }
        this._age = value < 0 ? 0 : value;
    }
}
const user1 = new User('steve', 'job', -1); // 나이가 음수일 수 없듬
console.log(user1.age);

// 3. Fields (public, private)
// Too soon!
class Experiment{
    publicField = 2;
    #privateField = 0;  // 클라스 밖에선 읽을 수 없음 .. 
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

// 4. Static properties and methods
// Too soon!
class Article{
    static publisher = 'Dream Coding';  // object와 상관없이 공통적인 부분 - 메모리 사용 줄임 
    constructor(articleNumber){
        this.articleNumber = articleNumber;
    }
    static printPublisher(){
        console.log(Article.publisher);
    }
}
const article1 = new Article(1);
const article2 = new Article(2);
// static 은 object 마다 설정되는게 아니라 class 자체에 붙어있음 
// console.log(article1.publisher); // error
console.log(Article.publisher);
Article.printPublisher();

// 5. Inheritance
// A way for one class to extend another class
class Shape{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        console.log(`drawing ${this.color} color of`);
    }
    getArea(){
        return this.width * this.height;
    }
}
class Rectangle extends Shape {}
class Triangle extends Shape{
    draw(){
        super.draw(); // 부모의 메소드 호출
        console.log('🔺');
    }
    getArea(){  // 재정의 
        return (this.width * this.height) / 2;
    }
    toString(){ // Object안의 메소드 재정의 
        return `Trianble: color: ${this.color}`;
    }
}

const rectangle = new Rectangle(20,20,'blue');
rectangle.draw(); 
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle); //T
console.log(triangle instanceof Rectangle);  // F
console.log(triangle instanceof Triangle);  // T
console.log(triangle instanceof Shape);     // T
console.log(triangle instanceof Object);    // T
