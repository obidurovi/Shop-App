const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single_product');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');




// Get Products
const getProducts = () => {
    const data = getLSData('product');

    if (!data) {
        product_list.innerHTML = `
        <tr>
            <td colspan="7" class="text-center">No Products Found!</td>
        </tr>`
    }

    if (data) {
        let list = '';
        let totalAmount = 0;

        data.map((item, index) => {
            totalAmount += (item.price * item.quantity);
            list += `
            <tr>
                <td>${index + 1}</td>
                <td><img style="width: 60px; height: 60; object-fit: cover; border-radius: 4px;" src="${item.photo}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a class="btn btn-info btn-sm product_view" data-bs-toggle="modal" data_index="${index}" href="#view-modal"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning btn-sm product_edit" data-bs-toggle="modal" data_index="${index}" href="#edit-modal"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm product_delete" data_index="${index}" href=""><i class="fas fa-trash"></i></a>
                </td>
        </tr>
            `
        });

        list += `<tr>
            <td colspan="6" class="text-end">Total Amount = ${totalAmount} BDT</td>
            <td></td>
        </tr>`

        product_list.innerHTML = list;
    }
}

getProducts();

product_form.onsubmit = (e) => {
    e.preventDefault();

    // Get Data 
    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());


    // Form Validation
    if (!name || !price || !quantity || !photo) {
        msg.innerHTML = setAlert('All Fields Are Required!');
    }else{

        createLSData('product', productData)

        msg.innerHTML = setAlert('Data Stable', 'success');
        product_form.reset();
        getProducts();
    }
}


// View Product
product_list.onclick = (e) => {
    e.preventDefault();


    if (e.target.classList.contains('product_view')) {
        let index = e.target.getAttribute('data_index');
        let data = getLSData('product');
        const { name, price, photo, quantity,  } = data[ index ];


        single_product.innerHTML = `
            <img class="shadow" src="${ photo }" alt="">
            <h1>${ name }</h1>
            <h6>Quantity: ${ quantity } KG</h6>
            <p>Total Price: ${ price * quantity } BDT</p>
        `
    } 
    
    if (e.target.classList.contains('product_edit')) {

            let index = e.target.getAttribute('data_index');
            let data = getLSData('product');
            const { name, price, quantity, photo} = data[index];

            product_update_form.innerHTML = `
                <div class="my-3">
                <label for="">Name</label>
                <input name="name" type="text" value="${ name }" class="form-control">
                </div>
                <div class="my-3">
                    <label for="">Price</label>
                    <input name="price" type="text" value="${ price}" class="form-control">
                </div>
                <div class="my-3">
                    <label for="">Quantity</label>
                    <input name="quantity" type="text" value="${ quantity}" class="form-control">
                </div>
                <div class="my-3">
                    <label for="">Quantity</label>
                    <input name="index" type="text" value="${ index }" class="form-control">
                </div>
                <div class="my-3">
                    <label for="">Photo</label>
                    <input name="photo" type="text" value="${ photo}" class="form-control">
                </div>
                <div class="my-3">
                    <img class="w-100" src="${ photo }" alt="">
                </div>
                <div class="my-3">
                    <img class="w-100" src="" alt="">
                </div>
                <div class="my-3">
                    <input type="submit" class="btn btn-primary w-100" value="Update Now">
                </div>
            `
            }
    
    if (e.target.classList.contains('product_delete')) {
        let index = e.target.getAttribute('data_index');
        let data = getLSData('product');

        data.splice(index, 1);
        updateLSData('product', data);
        getProducts();

    }        

}




product_update_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const { name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    let all_data = getLSData('product');

    all_data[index] = { name, price, quantity, photo };


    updateLSData('product', all_data);
    getProducts();
}