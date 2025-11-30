use std::{env,process};
use minigrep::Config;
fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(
        |err| {
            //change the error message to error stream
            eprintln!("Problem in parsing the arguments: {err}");
            process::exit(1);
        }
    );
    // println!("Searching for {:?}",config.query);
    // println!("In the file path {:?}",config.file_path);
    if let Err(e) = minigrep::run(config){
        eprintln!("Application error: {e}");
        process::exit(1);
    }
}


