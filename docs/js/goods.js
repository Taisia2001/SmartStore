var cart={};
var data;
var cartGoods=0;
$('document').ready(function (){
    var requestURL ='https://nit.tron.net.ua/api/product/list';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        data=request.response;
        checkCart();
        changeCart(0);
        $('.bFoot').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" onclick="createPost()">Buy</button>');
    }

    initNav();
    loadGoods('https://nit.tron.net.ua/api/product/list','All Products');





});
function createPost() {
if (cartGoods==0){
    alert('Error, your cart is empty');
}else{
    $.post('https://nit.tron.net.ua/api/order/add', {
            //products = '1:5, 2:2, 4:2'
            token: 'x8H_i721iqlF4YP2BTAU',
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            async: false,
            email: document.getElementById('email').value,
            products:cart,

        },
        function (data, textStatus, jqXHR) {
        if (data.status=="error"){

            var errors="";
            for(var er in data.errors){
                errors+=data.errors[er]+"\n";
            }
            alert(errors);
        }else{
            document.getElementById('name').value="";
            document.getElementById('phone').value="";
            document.getElementById('email').value="";
            cart={};
            cartGoods=0;
            localStorage.setItem('cart', JSON.stringify(cart) );
            if(!alert('Order successfully accepted')){window.location.reload();}

        }

        });
}}
function initNav(){
    var requestURL = 'https://nit.tron.net.ua/api/category/list';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var menu = request.response;
        var out="<a onclick='changeGoods(this)' data-art='1' class=\"categories standard_el\">All</a>";
        menu.forEach(function (item) {
            out+="<a onclick='changeGoods(this)' data-art='"+item.id+"' class=\"categories standard_el\">";
            out+=item.name;
            out+="</a>";
        });
        $('#navigation').html(out);

    }

}
function changeGoods(item) {
    if($(item).attr('data-art')==1){loadGoods('https://nit.tron.net.ua/api/product/list',item.innerHTML+' Products');
    }else{
        loadGoods('https://nit.tron.net.ua/api/product/list/category/'+$(item).attr('data-art'),item.innerHTML)
    }

}
function loadGoods(url,header){
    var requestURL = url;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    var out='<h2 class="content_header">'+header+'</h2><div class="row ">';
    request.onload = function() {
        var products=request.response;
        products.forEach(function (item) {
            out+='<div class="books col-lg-3"> <img src="'+item.image_url+'" data-toggle="modal" data-target="#productModal" onclick="prodModal(this)"  alt="img" data-art="'+item.id+'"><br>';
            if(item.special_price!=null){out+='<span class="price last_price">'+item.price+'₴</span>'
                out+='<span class="price">'+item.special_price+'₴</span><br>';
            }else{out+='<span class="price">'+item.price+'₴</span><br>';}
            out+='<a onclick="prodModal(this)" data-toggle="modal" data-target="#productModal" data-art="'+item.id+'">'+item.name+'</a> <br><button class="buy_button" onclick="addToCart(this)" data-art="'+item.id+'" data-toggle="modal" data-target="#cartModal" >Buy</button></div>';


        });
        out+='</div>';
        $('.container').html(out);
    }

}
function prodModal(item) {
    var el = getElementById(($(item).attr('data-art')));
    $('.product-title').html(el.name);
    var inner = ' <img src="' + el.image_url + '" alt="img" data-art="' + item.id + '"><br>';
    inner+='<br><h4>' + el.name + '</h4>';
    if (el.special_price != null) {
        inner += '<span class="price last_price">' + el.price + '₴ </span>'
        inner += '<span class="price"> ' + el.special_price + '₴</span><br>';
    } else {
        inner += '<span class="price">  ' + el.price + '₴</span><br>';
    }
    inner += '<br><p class="description">' + el.description + '</p>';
    $('#product-content').html(inner);
    inner='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#cartModal" onclick="addToCart(this)" data-art="'+el.id+'" >Buy</button>'
    $('.prod').html(inner);
}
function addToCart(item) {
    if(cart[$(item).attr('data-art')]!=undefined){
        cart[$(item).attr('data-art')]++;}else{
        cart[$(item).attr('data-art')]=1;
    }
    changeCart(1);
}
function changeCart( num){
    var out='';
    var total=0;
    var totalS='';
    cartGoods=cartGoods+num;
    if(cartGoods==0){ out='<span class="empty">Your cart is empty</span>';}
    else{
        var el;
        for(var w in cart){
            el=getElementById(w);
            out+='<div class="book">';
            out+='<button class="delete" data-art="'+w+'">x</button>';
            out+='<img src="'+el.image_url+'"><br>';
            out+='<span class="name">'+el.name+'</span>';
            out+='<span class="priceC"> '+el.price+'₴</span><br>';
            out+='<span class="change"><button class="minus_button" data-art="'+w+'"+>-</button>';
            out+='<span class="num">'+cart[w]+'</span>';
            out+='<button class="plus_button" data-art="'+w+'"+>+</button>';
            out+='<span class="total">'+(el.price*cart[w])+'₴</span></span>';
            out+='</div><br>';
            total+=el.price*cart[w];
        }
        totalS='Total: '+total+'₴';
    }
    var buttons='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
    if(cartGoods!=0){ buttons+='<button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#buyModal">Buy</button>'}
    $('#cart_number').html(cartGoods);
    $('#cart_total').html(totalS);
    $('#cart-content').html(out);
    $('#cart-footer').html(buttons);
    $('button.delete').on('click',deleteFromCart);
    $('button.plus_button').on('click',plusBooks);
    $('button.minus_button').on('click',minusBooks);
    localStorage.setItem('cart', JSON.stringify(cart) );
}
function getElementById(id) {
    for(var k in data){
        if(data[k].id==id)return data[k];
    }
}
function plusBooks() {
    var articul=$(this).attr('data-art');
    cart[articul]++;
    changeCart(1);
}
function minusBooks() {
    var articul=$(this).attr('data-art');
    if(cart[articul]>1){
        cart[articul]--;
        changeCart(-1);}
}
function deleteFromCart() {
    var articul=$(this).attr('data-art');
    cartGoods=cartGoods-1*cart[articul];
    delete cart[articul];
    changeCart(0);

}
function checkCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
        for (var i in cart) cartGoods += cart[i];
    }
}