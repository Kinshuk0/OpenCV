//example structure of modules for better uderstanding !

// backyard
// ├── Cargo.lock
// ├── Cargo.toml
// └── src
//     ├── garden
//     │   └── vegetables.rs
//     ├── garden.rs
//     └── main.rs
// use crate::garden::vegetables::Asparagus;
// pub mod garden;
// fn main() {
//     let plant = Asparagus {};
//     println!("I'm growing {plant:?}!");
// }


//another one 
// crate
//  └── front_of_house
//      ├── hosting
//      │   ├── add_to_waitlist
//      │   └── seat_at_table
//      └── serving
//          ├── take_order
//          ├── serve_order
//          └── take_payment

fn main() {
    println!("Hello, world!");
}
