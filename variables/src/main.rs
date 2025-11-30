use std::io;
fn tupple(){
    let tup:(i32,f32,char) = (500,500.12,'😭');
    let (x,y,z) = tup;
    println!("This is example for tupple {x};{y};{z}");
    println!("This is another way:");
    println!("{}",tup.0);
    println!("{}",tup.1);
    println!("{}",tup.2);
}
fn shadow(){
    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;
        println!("This is x from inner scope {x}");
    }
    println!("This is x from outer scope {x}");
}
fn funWithArray(){
    let arr:[u32;5] = [1,2,3,4,5];
    println!("Enter an array index.");
    let mut index = String::new();
    io::stdin().read_line(&mut index).expect("Failed to read line");
    let index: usize  = index.trim().parse().expect("Index entered was not a number");
    let ele: u32 = if index > 4 { arr[4] } else { arr[index] };
    println!("Value is {ele}");
} 
fn main(){
    // let mut x = 5;
    // println!("The value of x is : {x}");
    // x = 6;
    // println!("The value of x is : {x}");
    shadow();
    tupple();
    funWithArray();
}
