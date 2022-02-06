let functions = firebase.functions()

functions.useFunctionsEmulator('http://localhost:5001')

let btn = document.querySelector("#btn-get-data")
let label = document.querySelector("#label")
let retrieveData = functions.httpsCallable("item-getItemsByUids")

btn.addEventListener("click", (e) => {
  retrieveData()
  .then((res) => {
    console.log('res', res);
    console.log("successfully retrieved")
  })
  .catch((e) => console.log(e))
})
