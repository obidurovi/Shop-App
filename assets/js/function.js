// Alert Function
const setAlert = (msg, type = "danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}


// Set Value LS
const createLSData = (key, value) => {

    // init value
    let data = [];

    // check key exist or not
    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }

    // push data
    data.push(value);

    localStorage.setItem(key, JSON.stringify(data));
}

const getLSData = (key) => {

    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
    

}


// Update LS DAta
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}