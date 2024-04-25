export const getOrders = ()=> {
    return fetch('https://dummyjson.com/carts/1').then(res => res.json())
};

export const getMenu = ()=> {
    return fetch('http://localhost:3004/products').then(res => res.json())
};

 export function fetchProducts(setProducts) {
    fetch("http://localhost:3004/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unexpected Server Response");
            }
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            setProducts(data)
        })
        .catch((error) => console.log("Error: ", error));
}
