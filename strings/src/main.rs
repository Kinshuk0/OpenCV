fn main() {
    //initialising same as vector
    let mut s = String::new();
    let data = "initial contents";
    //to convert the data into string
    let s = data.to_string();
    let s = "initial contents".to_string();
    //also the equivalent 
    //some examples are listed here
    let hello = String::from("السلام عليكم");
    let hello = String::from("Dobrý den");
    let hello = String::from("Hello");
    let hello = String::from("שלום");
    let hello = String::from("नमस्ते");
    println!("This is Hello :  {}",hello);
    let hello = String::from("こんにちは");
    let hello = String::from("안녕하세요");
    let hello = String::from("你好");
    let hello = String::from("Olá");
    let hello = String::from("Здравствуйте");
    let hello = String::from("Hola");
    let s = String::from("initial contents");
    println!("This is s :  {}",s);
    //just like vectors pushing the string into other string
    let mut s = String::from("foo");
    s.push_str("bar");
    println!("{}",s);
    //playing with + operator in the strings 
    let s1 =String::from("Hello ");
    let s2 =String::from("world! ");
    let s4 = String::from("add me ");
    //here string s1 is bowwred and s2 is added to it and finally placed it in s3, this is important
    let s3 = s1 + &s2 + &s4 + "kinshuk";
    println!("this is s3 : {}",s3);
    //rust doesnt support the indexing refer book
    //it supports slicing, example of slicing
    //one has to be carefull while playing with the slices
    let hello = "Здравствуйте";
    let s = &hello[0..4];
    println!("This is slice : {}",s);
    //kinshuk is here
    //one has to be specific wether to choose char or byes
    for i in hello.chars() {
        println!("{i}");
    }
    // for bytes
    for i in hello.bytes(){
        println!("{i}");
    }
    //there are more functionality in string like replace find etc.. check docs 
}
