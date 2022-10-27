


const parent = window.document.getElementById("parent")

const H1 = window.document.createElement("h1")
H1.innerText = "Hey!"
parent.appendChild(H1)

setTimeout(()=>{
    console.log("Ran!");
    H1.remove()
},10000)