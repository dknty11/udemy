const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('#ms1')
const messageSecond = document.getElementById('#ms2')

// Get value from api
const getvalue = (location) => fetch('/weather?address='+location).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = 'This is ' + data.location
            messageSecond.textContent = 'And the weather is ' + data.forecast
        }
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'

    const location = search.value
    getvalue(location)

    console.log('testing')
})