use std::fs::{File,read_to_string};
//ways of handling error
use std::io::{self,Read,ErrorKind};
//another to use ? operator, this is similar to javascript to the existance of the value
fn f() -> Result<String,io::Error>{
    let mut username = String::new();
    File::open("hello.text")?.read_to_string(&mut username)?;
    Ok(username)
}


fn read_username_from_file() -> Result<String,io::Error>{
    let read_username_file_result = File::open("hello.txt");
    let mut username_file = match username_file_result{
        Ok(file) => file,
        Err(r) => return Err(e),
    };
    let mut username = String::new();
    match username_file.read_to_string(&mut username){
        Ok(_) => Ok(username),
        Err(e) => return Err(e),
    }
}
fn main() {
    // let greeting = File::open("hello.txt");
    // let greeting_file = match greeting{
    //     Ok(file) => file,
    //     Err(error) => match error.kind(){
    //         ErrorKind::NotFound => match File::create("hello.txt"){
    //             Ok(fc) => fc,
    //             Err(e) => panic!("Problem creating the file {e:?}"),
    //         },
    //         other_error => {
    //             panic!("Problem opening the file: {other_error:?}");
    //         },
    //     },
    // };

    //another method using unwrap method 

    // let greeting_file = File::open("hello.txt").unwrap();
    let greeting_file = File::open("hello.txt")
    .expect("there is some error in the hello.txt file");
}
