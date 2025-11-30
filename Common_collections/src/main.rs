//towards vectors, hashmaps(maps), and more
#[allow(unused_variables)]
fn main() {
    let v: Vec<i32> = Vec::new();
    //another way using a macro 
    let v1 = vec![1,2,3];
    let mut v2:Vec<i32> = Vec::new();
    v2.push(5);
    v2.push(6);
    v2.push(7);
    v2.push(8);
    v2.push(9);
    let third:&i32 = &v2[2];
    println!("This is third element {}",third);
    //now here using the get method, we need to use options
    let third: Option<&i32> = v2.get(100);
    match third{
        Some(third) => println!("third is {}",third),
        None => println!("No third element"),
    }
   for i in &v2{
    println!("{}",i);
   } 
   //for changing the values 
   for i in &mut v2 {
      *i += 50;
   }
   for i in v2{
      println!("{}",i);
   }
   //playing with enums
   #[derive(Debug)]
   pub enum Spreedsheetcell{
    Int(i32),
    Float(f64),
    Text(String),
   }

   let row = vec![
    Spreedsheetcell::Int(3),
    Spreedsheetcell::Float(10.2),
    Spreedsheetcell::Text(String::from("Kinshuk")),
   ];
   for i in row{
      println!("{:?}",i);
   }
}
