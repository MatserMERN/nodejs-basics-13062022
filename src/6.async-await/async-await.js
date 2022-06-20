// console.log("one")
// console.log("two")
// console.log("three")

const Promise = require('promise')

function getNumbers(){
    return new Promise((resolve, reject) => {
            setTimeout(function(){
                resolve("two")
            }, 2000)
    })
}


getNumbers().then((data) => {
    console.log("one")
    console.log(data)
})
console.log("three")

//  async function printNumbers(){
//     const two = await getNumbers()
//     console.log("one")
//     console.log(two)
// }

// printNumbers()
// console.log("three")
