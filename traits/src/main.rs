pub trait Summary{
    fn summarize(&self) -> String{
        //this code here is for default implementation
        String::from("Default Implementation...")
    }
    fn summarize_author(&self) -> String;
}
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}
impl Summary for NewsArticle{
    fn summarize(&self) -> String {
        return format!("{}, by {} ({})",self.headline,self.author,self.location);
    }
    fn summarize_author(&self) -> String {
        return format!("Read more from @{}",self.author);
    }
}
pub struct Tweet{
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}
impl Summary for Tweet{
    fn summarize(&self) -> String{
        return format!("{}: {}",self.username,self.content);
    }
    fn summarize_author(&self) -> String {
        return format!("Read more from @{}",self.username);
    }
}
//passing traits as the parameters
pub fn notify(item: &impl Summary){
    //here item is something which has the summary trait implemented
    // Instead of a concrete type for the item parameter, we specify the impl keyword and the trait name. 
    // This parameter accepts any type that implements the specified trait
    println!("Breaking news! {}", item.summarize());
}
// a better implementation of above known as trait bound
pub fn notify<T:Summary>(item:&T){
    println!("Breaking news! {}", item.summarize());
}

fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
// Here generic T is using Display Trait and Clone trait
// and similarly U is using Clone Trait and Debug Trait
//above can be implemented in a better way by using where clause
//below is the implementataion of the above logic 
sn some_function<T,U>(t:&T,u:&U)->i32 where 
T: Display + Clone,
U: Clone + Debug, 
{}
///////////////////////////

//returning Types that Implement Traits
//The impl Trait syntax lets you concisely specify that a function 
// returns some type that implements the Iterator trait without 
// needing to write out a very long type.
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
////////////////////////                        
//another concept idk what it is called 
use std::fmt::Display;
struct Pair<T>{
    x: T,y: T,
}
impl<T> Pair<T>{
    fn new(x:T, y:T)->Self{
        Self{x,y}
    }
}
impl<T:Display + PartialOrd> Pair<T>{
    fn cmp_display(&self){
        if slef.x >= self.y{
            println!("X bada hai, x ki value hai {}",self.x);
        }
        else{
            println!("Y bada hai, y ki value hai {}",self.y);
        }
    }
}
///////////////////////////
fn main() {
    let tweet = Tweet{
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply : false,
        retweet: false,
    };
    let article = NewsArticle{
        headline : String::from("Penguins win the Stanley Cup Championship"),
        location : String::from("Pittsburgh, PA, USA"),
        author : String::from("Iceburgh"),
        content: String::from("The Pittsburgh Penguins once again are the best \\ hockey team in the NHL"), 
    };

    println!("1 new tweet: {}",tweet.summarize());
    println!("New article available: {}",article.summarize());
    println!("{}",tweet.summarize_author());
    println!("{}",article.summarize_author());
}
