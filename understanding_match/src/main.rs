#[derive(Debug)]
enum Coin{
    Penny,
    Nickle,
    Dime,
    Quarter(UsState),
}
#[derive(Debug)]
enum UsState{
    Alabama,
    Alaska,
    Ohio,
    California, // and lot more
}
fn value_in_cents(coin: Coin) -> u8 {
    match coin{
        Coin::Penny => {
            println!("Lucky Penny");
            return 1;
        },
        Coin::Dime => 10,
        Coin::Nickle => 5,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}",state);
            return 25;
        },
    }
}

//Matching with Option<T>
// we want to write a function that takes an Option<i32> and, 
// if there’s a value inside, adds 1 to that value. 
// If there isn’t a value inside, 
// the function should 
// return the None value and not attempt to perform any operations.

fn plus_one(x: Option<i32>) -> Option<i32>{
    match x {
        None => None,
        Some(i) => Some(i+1),
    }
}

fn main() {
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
    println!("This is five : {:?}",five);
    println!("This is six : {:?}",six);
    println!("This is None : {:?}",none);
}
