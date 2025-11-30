//adding lifetime parameters <'a>
// &i32        // a reference
// &'a i32     // a reference with an explicit lifetime
// &'a mut i32 // a mutable reference with an explicit lifetime
fn longest<'a>(x:&'a str,y:&'a str) -> &'a str{
    if x.len() > y.len(){
        x
    }
    else {
        y
    }
}
struct ImportantExperpt<'a>{
    part: &'a str,
}
impl<'a> ImportantExperpt<'a>{
    fn level(&self) -> i32 {
        3
    }
}
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
fn main() {
    // let r;                // ---------+-- 'a
    //                       //          |
    // {                     //          |
    //     let x = 5;        // -+-- 'b  |
    //     r = &x;           //  |       |
    // }                     // -+       |
    //                       //          |
    // println!("r: {r}");   //          |
    let x = 5;
    let r =&x;
    println!("r:{r}");
    let string1 = String::from("abcd");
    let string2 = "xyz";
    let result = longest(string1.as_str(),string2);
    println!("The longest string is {result}");
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.spilt('.').next().expect("COuld not find a '.'");
    let i = ImportantExperpt{
        part: first_sentence,
    };

}                         // ---------+
