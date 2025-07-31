hello(1, 2, "Hello", 4, 5)
function hello(a, b){
    console.log(a);
    console.log(b);
    for(param of arguments){
        console.log(param);
    }
}