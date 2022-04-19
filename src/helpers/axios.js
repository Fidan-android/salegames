import axios from "axios";

const path = "http://127.0.0.1:5000/";

export async function main() {    
      var res = await axios.get(path);
      return res;
}

export async function getProduct(product_id) {
    var products = await axios.get(path + "product", {
        params: {
            product_id: product_id,
        },
    });
    return products;
}

export async function getAllProducts() {
    var products = await axios.get(path + "products");
    return products;
}

export async function login(login, password) {
    var response = await axios.post(path, {
        login: login,
        password: password
    })
}

export async function checkPermission(token) {
    
}