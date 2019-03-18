// Object properties short hand

const name = 'Vern'
const userAge = 25

const user = {
    name: name,
    age: userAge,
    location: 'New york'
}

console.log(user)

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 300,
    stock: 200,
    salePrice: undefined,
    rating: 4
}

// const label = product.label
// const stock = product.stock

// const {label:productLabel, stock, salePrice} = product
// console.log(productLabel)
// console.log(salePrice)

const transaction = (type, {label, price, stock=0, salePrice:newPrice, rating=0} = {}) => {
    console.log(type, label, stock, price, newPrice, rating)
}

transaction('order', product)
transaction('order')