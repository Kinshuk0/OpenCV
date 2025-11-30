use std::cmp::PartialOrd;
fn f(list: &Vec<i32>) -> &i32{
    let mut largest = &list[0];
    for item in list{
        if item > largest {
            largest = item;
        }
    }
    return largest;
}
fn f1(list: &[char]) -> &char {
    let mut largest = &list[0];
    for item in list{
        if item > largest {
            largest = item;
        }
    }
    largest
}
// we wrote same code to handle different data types this problem can be overcome
// the generics below is the implementation of the generics
// here partial order is used to compare the types, rust dont know wether these
// types are comparable or not, so we need to tell rust that these types are comparable
// so we use the PartialOrd trait to tell rust that these types are comparable
// for eg complex numbers are not comparable so we need to tell rust that these types are comparable and 
// we use the PartialOrd trait to tell rust that these types are comparable
fn generic<T:PartialOrd>(list : &Vec<T>) -> &T {
    let mut largest = &list[0];
    for i in list {
        if i > largest {
            largest = i;
        }
    }
    largest 
}

//implementation of generics on  structs
// both the types must be of same types
#[derive(Debug)]
struct Point<T>{
    x: T,
    y: T,
}
//to use of diiferent types 
#[derive(Debug)]
struct Point_diff<T,U>{
    x: T,
    y: U,
}
//now generics and enums
enum Option<T> {
    Some(T),
    None,
}
enum Result<T,E>{
    Ok(T),
    Err(E),
}
//Method Definition in generics
impl<T> Point<T>{
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let number_list = vec![1,2,3,4,5,6,7];
    let mut largest = &number_list[0];
    println!("largest : {}",largest);
    for number in &number_list{
        if number > largest{
            largest = number;
        }
    }
    println!("The largest number is {largest}");
    let res = f(&number_list);
    println!("this is res : {}",res);
    let list = vec!['a','d','b'];
    let res1 = f1(&list);
    println!("res1 : {}",res1);
    let res2 = generic(&number_list);
    let res3 = generic(&list);
    println!("res2 : {}" , res2);
    println!("res3 : {}", res3);

    //for stucts and enums maybe 
    let integer_type = Point{x : 5 , y : 10};
    let float_type  = Point{x : 5.5 , y : 10.500};
    println!("integer : {integer_type:?}");
    println!("float : {float_type:?}");
    let integer_float  = Point_diff{x: 5, y: 10.5};
    println!("integer_float: {integer_float:?}");
    println!("integer_type.x = {}", integer_type.x);
}
