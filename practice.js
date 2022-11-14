const person = {
    name:"Dom",
    hobbies:[
        "web development",
        "swimimng",
        "eating"
    ]
}


const person1 = {...person}
const person2 = Object.assign({},person)

console.log("person1",person1)
console.log("person2",person2)