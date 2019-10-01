console.log('Client side JS file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {

        console.log(data)
    })
})

fetch('/weather?address=!').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })

})


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#success')
const message2 = document.querySelector('#failure')

message1.textContent = 'Loading ......'
message2.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value
    console.log(location)

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1.textContent=data.error
            message2.textContent=''
        }else{
            message1.textContent = data.location
            message2.textContent = data.forecast
           
        }
        
    })

})

})