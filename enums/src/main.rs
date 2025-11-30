#[derive(Debug)]
enum IpAddrKind{
    V4(String),
    V6(String),
}
//good example of Enum
#[derive(Debug)]
enum Messsage{
    Quit,
    Move {x:i32,y:i32},
    Write(String),
    ChangeColor(i32,i32,i32),
}
//old way
// #[derive(Debug)]
// struct IpAddr{
//     kind:IpAddrKind,
//     address: String,
// }
fn main() {
    // let Home = IpAddr{
    //     kind: IpAddrKind::V4,
    //     address: String::from("192.168.0.1"),
    // };
    // let loopback = IpAddr{
    //     kind: IpAddrKind::V6,
    //     address: String::from("::1"),
    // };
    let Home = IpAddrKind::V4(String::from("192.168.0.1"));
    let loopback = IpAddrKind::V6(String::from("::1"));
    println!("{:?},{:?}",Home,loopback);
}
