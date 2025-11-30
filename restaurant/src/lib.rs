// this is the module tree of the restaurant crate
// crate
//  └── front_of_house
//      ├── hosting
//      │   ├── add_to_waitlist
//      │   └── seat_at_table
//      └── serving
//          ├── take_order
//          ├── serve_order
//          └── take_payment

use std::collections::HashMap;
use std::fmt;
use std::io;
//use of as keyword

//multiple importing
use std::cmp::Ordering;
use std::io;
//above snippet can also be implemented as 
use std::{cmp::Ordering,io};

//another example of above use case
use std::io;
use std::io::Write;
//can be written as
use std::io::{Self,Write};

//global operator to bring everything from the crates
use std::collections::*;

use std::io::Result as IoResult;

fn f1() -> fmt::Result{
    //
}
fn f2() -> io::Result<()>{
    //
}
fn main() {
    let mut mp = HashMap::new();
    mp.insert(1,2);
}
mod front_of_house{
    pub mod hosting{
        pub fn add_to_waitlist() {}
        fn seat_at_table() {}
    }
    mod serving{
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}

use crate::front_of_house::hosting;
mod customer {
    pub fn  eat_at_restaurant(){
        hosting::add_to_waitlist();
    }
}



fn deliver_order() {}

mod back_of_house{
    pub enum Appetizer{
        Soup,
        Salad,
    }
    pub struct Breakfast{
        pub toast: String,
        seasonal_fruit: String,
    }
    impl Breakfast{
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast{
                tosat: String::from(toast),
                seasonal_fruit: String::from("Peaches"),
            }
        }
    }
    fn fix_incorrect_order(){
        cook_order();
        super::deliver_order();
    }
    fn cook_order(){}
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();
    // realtive path
    front_of_house::hosting::add_to_waitlist();
    let mut meal = back_of_house::Breakfast::summer("Rye");
    meal.toast = String::from ("Wheat");
    println!("I had like {} toast please",meal.toast);
    let order1 = back_of_house::Appetizer::Salad;
    let order2 = back_of_house::Appetizer::Soup;
}
//if you decalre the struct by default its private but pub struc only makes
//struct public not its feild but when you try pub enum everything is public 

//importing from different files
mod front_of_house;
pub use crate::front_of_house::hosting;
pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}