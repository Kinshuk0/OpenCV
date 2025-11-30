#[derive(Debug)]
#[allow(unused_variables)]
struct Color(i32, i32, i32);

#[derive(Debug)]
struct Point(i32, i32, i32);

#[derive(Debug)]
struct Rect {
    width: i32,
    height: i32,
}

impl Rect{
    fn area(&self) -> i32{
        return self.width * self.height; 
    }
    fn can_hold(&self, rectangle: Rect) -> bool {
        self.width > rectangle.width && self.height > rectangle.height
    }
    fn square(size:i32) -> Self{
        Self{
            width: size,
            height: size,
        }
    }
}

#[derive(Debug)]
struct User {
    active: bool,
    name: String,
    email: String,
    sign_in_account: u64,
}

// fn area(rectangle: Rect) -> i32 {
//     return rectangle.width * rectangle.height;
// }

fn main() {
    let kinshuk = User {
        active: true,
        name: String::from("kinshuk"),
        email: String::from("007kinshuk@gmail.com"),
        sign_in_account: 1,
    };
    let p = Point(0, 0, 0);
    let c = Color(0, 0, 0);
    let rectangle = Rect {
        width: 10,
        height: 20,
    };
    let r1 = Rect {
        width: 30,
        height: 50,
    };
    let r2 = Rect {
        width: 10,
        height: 40,
    };
    let r3 = Rect {
        width: 60,
        height: 45,
    };
    // println!("{}, {}", p.0, c.0);
    // println!("{},{},{},{}", kinshuk.email, kinshuk.sign_in_account, kinshuk.active, kinshuk.name);
    println!("This is rect: {:?}", rectangle);
    dbg!(&rectangle);
    //println!("And its area is {}", area(rectangle));
    println!("Area of the rectangle is : {}",rectangle.area());
    println!("Can rect1 hold r2? {}", r1.can_hold(r2));
    println!("Can rect1 hold r3? {}", r1.can_hold(r3));
    //
    let square = Rect::square(5);
    println!("{:?}",square);
}
