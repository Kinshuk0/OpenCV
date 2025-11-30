use std::collections::HashMap;
fn main() {
    //creation of a hashMap
    //homogeneous all keys must have the same type
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"),10);
    scores.insert(String::from("Yellow"),20);
    use std::collections::HashMap;
    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
    //for iteration
    for (key, value) in &scores {
        println!("{key}: {value}");
    }
}
