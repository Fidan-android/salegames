import axios from "axios";

// путь до нашего бэкенда
const path = "http://127.0.0.1:5000/";

// конфигурация заголовков для запроса, в которую добавляется наш токен
const config = {
    headers : {
        Authorization : `Bearer ${localStorage.getItem('access_token')}`,
    }
}

// все функции для запросов к серверу
export async function main() {    
      var res = await axios.get(path);
      return res;
}

export async function login(form) {    
    var response = await axios.post(path + "login", {
        login: form.login.value,
        password: form.password.value
    });
    return response;
}

export async function signout() {    
    var response = await axios.get(path + "logout", config);
    return response;
}

export async function registration(form) {    
    var response = await axios.post(path + "registration", {
        firstname: form.firstname.value,
        name: form.name.value,
        login: form.login.value,
        password: form.password.value
    });
    return response;
}

export async function getProduct(product_id) {
    var products = await axios.get(path + "product/" + product_id);
    return products;
}

export async function getAllProducts() {
    var products = await axios.get(path + "products");
    return products;
}

export async function addToCart(product_id, count) {
    var response = await axios.post(path + "cart", {
        product_id: product_id,
        count: count
    }, config);

    return response;
}

export async function getCart() {
    var response = await axios.get(path + "cart", config);
    return response;
}

export async function addOrder(form, products_cart, amount) {
    var response = await axios.post(path + "order", {
        address: form.address.value,
        comment: form.comment.value,
        products: products_cart,
        amount: amount
    }, config);
    return response;
}

export async function updateOrder(order_id, status) {
    var response = await axios.put(path + "order", {
        order_id: order_id,
        status: status
    }, config);
    return response;
}

export async function checkPermission() {
    var response = await axios.get(path + "permission/", config);
    return response
}

export async function getImage(name){
    var response = await axios.get(path + "image/" + name);
    return response
}

export async function editImage(forma){
    let fd= new FormData(forma);
  
    var response = await axios.post(path + "image", fd);
    return response
}

export async function createProduct(forma){
    let fd= new FormData(forma);
  
    var response = await axios.post(path + "products", fd, config);
    return response
}

export async function profile() {
    var response = await axios.get(path + "profile", config);
    return response;
}

export async function updateProfile(forma) {
    var response = await axios.post(path + "profile", {
        first_name: forma.firstname.value,
        name: forma.name.value,
    }, config);
    return response;
}

export async function searchProducts(tag) {
    var response = await axios.post(path + "search", {
        tag: tag
    }, config);
    return response;
}

export async function addStockCountProduct(product_id) {
    var response = await axios.put(path + "products", {
        product_id: product_id,
    }, config);
    return response;
}

export async function getAdminOrders() {
    var products = await axios.get(path + "admin/orders");
    return products;
}