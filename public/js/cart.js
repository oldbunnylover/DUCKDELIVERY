let cart = {};
let like = {};

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    GetCartInfo();
}

if(localStorage.getItem('like')){
    like = JSON.parse(localStorage.getItem('like'));
    GetLikeInfo();
}

document.querySelectorAll('.cartJS').forEach(function(elem){
    elem.onclick = addToCart;
});

function anim(){
    document.querySelector('.cart').classList.add('tin');
}

function GetCartInfo(){
    cartToLocalStorage();
    $.post("/cart-info", cart)
    .then(function(body){
        showCart(body);
    })
}

function addToCart(){
    document.querySelector('.cart').classList.remove('tin');
    setTimeout(anim, 200);
    let goodsId = this.dataset.id;
    if(cart[goodsId]){
        cart[goodsId]++;
    } else {
        cart[goodsId] = 1;
    }
    GetCartInfo();
}

function showCart(body){
    let out = "";
    let style;
    let total = 0;
    for(let i = 0; i < Object.keys(cart).length; i++){
        style = "";
        if(like[Object.keys(cart)[i]] == 1) {
            style = `style="opacity: 1;"`;
        }
        out += `<div class="cart-item">
                    <div class="img">
                        <img src="../img/${body[i].image}">
                    </div>
                    <div class="description">
                        <div class="item-title"><a href="/product/${body[i].key}">${body[i].name}</a></div>
                        <div class="item-count">
                            <div class="math">
                                <div class="minus" data-id="${body[i].key}"><img src="../icons/minus.svg"></div>
                                <input class="field" type="text" value="${cart[body[i].key]}" readonly>
                                <div class="plus" data-id="${body[i].key}"><img src="../icons/plus.svg"></div>
                            </div>
                        </div>
                        <div class="item-price">${(body[i].price * cart[body[i].key]).toFixed(2)} руб</div>
                    </div>
                    <div class="likeItem" data-id="${body[i].key}">
                    <svg ${style} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16.0001 28.7204C15.6046 28.7214 15.2128 28.6442 14.8472 28.4931C14.4817 28.3421 14.1496 28.1203 13.8701 27.8404L3.57011 17.5404C2.75645 16.7179 2.1146 15.7417 1.68195 14.6687C1.24931 13.5957 1.03452 12.4473 1.05011 11.2904C1.05795 10.2303 1.27487 9.18209 1.68844 8.20589C2.10201 7.2297 2.70411 6.34468 3.46026 5.60155C4.2164 4.85841 5.11172 4.27175 6.09494 3.87518C7.07817 3.4786 8.12997 3.2799 9.19011 3.29045C10.2692 3.27958 11.3395 3.48552 12.3376 3.89607C13.3356 4.30662 14.241 4.91341 15.0001 5.68045L16.0001 6.68045L16.8201 5.86045C18.236 4.40702 20.1307 3.51596 22.1532 3.35232C24.1757 3.18868 26.189 3.76355 27.8201 4.97045C28.7486 5.6855 29.5141 6.59017 30.0657 7.62421C30.6172 8.65825 30.9421 9.79793 31.0188 10.9674C31.0954 12.1368 30.922 13.3091 30.5102 14.4063C30.0983 15.5035 29.4574 16.5003 28.6301 17.3304L18.1301 27.8404C17.8506 28.1203 17.5185 28.3421 17.153 28.4931C16.7874 28.6442 16.3956 28.7214 16.0001 28.7204ZM9.15011 5.28045C7.56063 5.27883 6.03287 5.89567 4.89011 7.00045C4.3075 7.56099 3.8442 8.2335 3.528 8.97758C3.21181 9.72166 3.04926 10.522 3.05011 11.3304C3.04134 12.2198 3.20919 13.102 3.54393 13.9259C3.87866 14.7499 4.37362 15.4992 5.00011 16.1304L15.3001 26.4304C15.3931 26.5242 15.5037 26.5986 15.6255 26.6493C15.7474 26.7001 15.8781 26.7262 16.0101 26.7262C16.1421 26.7262 16.2728 26.7001 16.3947 26.6493C16.5165 26.5986 16.6271 26.5242 16.7201 26.4304L27.2301 15.9104C27.847 15.2805 28.3237 14.5271 28.6287 13.6998C28.9338 12.8726 29.0604 11.9901 29.0001 11.1104C28.9467 10.2218 28.7019 9.35511 28.2825 8.5698C27.8631 7.78449 27.279 7.09907 26.5701 6.56045C25.3262 5.64334 23.7914 5.2097 22.2515 5.34033C20.7116 5.47095 19.2717 6.15693 18.2001 7.27045L16.7101 8.80045C16.6171 8.89418 16.5065 8.96857 16.3847 9.01934C16.2628 9.07011 16.1321 9.09625 16.0001 9.09625C15.8681 9.09625 15.7374 9.07011 15.6155 9.01934C15.4937 8.96857 15.3831 8.89418 15.2901 8.80045L13.5901 7.10045C12.4192 5.93972 10.8388 5.28602 9.19011 5.28045H9.15011Z" fill="red"/></svg>
                    </div>
                    <div class="remove-item" data-id="${body[i].key}">
                        <img src="../icons/delete.svg">
                    </div>
                </div>`;
        total += body[i].price * cart[body[i].key];
    }
    document.querySelector('.item-list').innerHTML = out;
    document.querySelector('.total').innerHTML = `${total.toFixed(2)} руб`;
    
    document.querySelectorAll('.minus').forEach(function(elem){
        elem.onclick = cartMinus;
    });
    document.querySelectorAll('.plus').forEach(function(elem){
        elem.onclick = cartPlus;
    });
    document.querySelectorAll('.remove-item').forEach(function(elem){
        elem.onclick = cartRemove;
    });
    document.querySelectorAll('.likeItem').forEach(function(elem){
        elem.onclick = likeItem;
    });
    document.querySelectorAll('.checkout').forEach(function(elem){
        elem.onclick = cartRemoveAll;
    });
}

function cartPlus(){
    let goodsId = this.dataset.id;
    cart[goodsId]++;
    GetCartInfo();
}

function cartMinus(){
    let goodsId = this.dataset.id;
    if(cart[goodsId] != 1){
        cart[goodsId]--;
    } else {
        delete(cart[goodsId]);
    }
    GetCartInfo();
}

function cartRemove(){
    let goodsId = this.dataset.id;
    delete(cart[goodsId]);
    GetCartInfo();
}

function cartRemoveAll(){
    for(key in cart){
        delete(cart[key]);
    }
    GetCartInfo();
}

function cartToLocalStorage(){
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) alert('Превышен лимит');
    }
}

//код для избранных товаров

function likeItem(){
    if(like[this.dataset.id]){
        delete(like[this.dataset.id]);
    } else {
        like[this.dataset.id] = 1;
    }
    GetCartInfo()
    GetLikeInfo();
}

function GetLikeInfo(){
    likeToLocalStorage();
    $.post("/like-info", like)
    .then(function(body){
        showLike(body);
    })
}

function showLike(body) {
    let out = "";
    for(let i = 0; i < Object.keys(like).length; i++){
        out += `<div class="like-item">
                    <div class="item-img"><a href="/product/${body[i].key}"><img src="../img/${body[i].image}" alt="${body[i].name}"></a></div>
                    <div class="like-description">
                            <div class="item-name"><a href="/product/${body[i].key}">${body[i].name}</a></div>
                            <div class="item-weight">${body[i].weight}</div>
                            <div class="item-price"><br>${body[i].price} руб</div>
                    </div>
                    <div class="likeIcon" data-id="${body[i].key}">
                        <img src="../icons/delete.svg">
                    </div>
                </div>`;
    }
    document.querySelector('.like-list').innerHTML = out;
    document.querySelectorAll('.likeIcon').forEach(function(elem){
        elem.onclick = likeRemove;
    });
}

function likeRemove() {
    delete(like[this.dataset.id]);
    GetCartInfo()
    GetLikeInfo();
}

function likeToLocalStorage(){
    try {
        localStorage.setItem('like', JSON.stringify(like));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) alert('Превышен лимит');
    }
}