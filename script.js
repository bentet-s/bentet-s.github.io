//global variables
let loggedIn = 0;
let stafflogin = 0;
let bookingprocess = 0;
let bookingdata = [];
let currentuser;
let location1;
let location2;
//staff account
const staffuser = 'staff123';
const staffpassword = 1234;
//booking stuff
const carlist = ['Transit','hilux','avanza','T34'];
const imageList = ['car_img/Transit.png', 'car_img/hilux.png', 'car_img/avanza.png', 'car_img/T34.png'];
const caramt = [10,9,3 ,1];
const pricelist = ['80','10','14','1000'];
const bookedlist = [];

//checking for extra return point
let ret = 0;

//carousel code
let carouindex = 1;
showcarou(carouindex);

function nextimg(n){
    showcarou(carouindex += n)
}

function currentimg(n){
    showcarou(carouindex = n)
}

function showcarou(n){
    let i;
    let img = document.getElementsByClassName("carousel");
    let dots = document.getElementsByClassName("dot");
    if (n > img.length) {carouindex = 1}
    if (n < 1) {carouindex = img.length}
    for (i = 0; i < img.length; i++) {
        img[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  img[carouindex-1].style.display = "block";
  dots[carouindex-1].className += " active";
    
}

//add return point
function addpoint(){
    event.preventDefault();
    let add = document.getElementById('addpoint');
    let btn = document.getElementById('addbtn');
    
    let createinput = document.createElement('input');
    createinput.setAttribute('type', 'text');
    createinput.classList.add('pickup');
    createinput.setAttribute('id', 'return')
    
    let createtext = document.createElement('h2');
    createtext.textContent = 'Return Point';
    
    add.style.padding = '0';
    add.style.width = '100%';
    add.style.paddingTop = '3%';
    
    btn.classList.add('hide');
    add.appendChild(createtext);
    add.appendChild(createinput);
    ret = 1;
    
    


}


//swap pages
function loginactive(){
    let home = document.getElementById("home");
    let login = document.getElementById("login");
    let booking = document.getElementById("booking");
    let payment = document.getElementById("payment");
    let staff = document.getElementById("staffpage");
    let mb = document.getElementById("mybookings");
    let about = document.getElementById('about');
    
    about.classList.add("hide");
    mb.classList.add("hide");
    staff.classList.add("hide");
    home.classList.add("hide");
    booking.classList.add("hide");
    login.classList.remove("hide");
    payment.classList.add("hide");
}

function homeactive(){
    let home = document.getElementById("home");
    let login = document.getElementById("login");
    let booking = document.getElementById("booking");
    let payment = document.getElementById("payment");
    let staff = document.getElementById("staffpage");
    let mb = document.getElementById("mybookings");
    let about = document.getElementById('about');
    
    about.classList.remove("hide");
    mb.classList.add("hide");
    staff.classList.add("hide");
    home.classList.remove("hide");
    booking.classList.add("hide");
    login.classList.add("hide");
    payment.classList.add("hide");
}

function bookingactive(){
    let home = document.getElementById("home");
    let login = document.getElementById("login");
    let booking = document.getElementById("booking");
    let payment = document.getElementById("payment");
    let staff = document.getElementById("staffpage");
    let mb = document.getElementById("mybookings");
    let about = document.getElementById('about');
    
    about.classList.add("hide");
    mb.classList.add("hide");
    staff.classList.add("hide");
    home.classList.add("hide");
    booking.classList.remove("hide");
    login.classList.add("hide");
    payment.classList.add("hide");
    availablebookings();
};

function paymentactive(){
    let home = document.getElementById("home");
    let login = document.getElementById("login");
    let booking = document.getElementById("booking");
    let payment = document.getElementById("payment");
    let staff = document.getElementById("staffpage");
    let mb = document.getElementById("mybookings");
    let about = document.getElementById('about');
    
    about.classList.add("hide");
    mb.classList.add("hide");
    home.classList.add("hide");
    booking.classList.add("hide");
    payment.classList.remove("hide");
    login.classList.add("hide");
    staff.classList.add("hide");
};
function staffactive(){
    let home = document.getElementById("home");
    let login = document.getElementById("login");
    let booking = document.getElementById("booking");
    let payment = document.getElementById("payment");
    let staff = document.getElementById("staffpage");
    let mb = document.getElementById("mybookings");
    let about = document.getElementById('about');
    
    about.classList.add("hide");
    mb.classList.add("hide");
    home.classList.add("hide");
    booking.classList.add("hide");
    staff.classList.remove("hide");
    login.classList.add("hide");
    payment.classList.add("hide");
    Sconfirm();
}
function mbactive(){
    let home = document.getElementById("home");
    let login = document.getElementById("login");
    let booking = document.getElementById("booking");
    let payment = document.getElementById("payment");
    let staff = document.getElementById("staffpage");
    let mb = document.getElementById("mybookings");
    let about = document.getElementById('about');
    
    about.classList.add("hide");   
    login.classList.add("hide");
    staff.classList.add("hide");
    home.classList.add("hide");
    booking.classList.add("hide");
    mb.classList.remove("hide");
    payment.classList.add("hide");
    mbcheck();
}
function logout(){
    let btn = document.getElementById("lbtn");
    let lbtn = document.getElementById("lobtn");
    let welcome = document.getElementById('welcome');
    let logins = document.getElementById('logins');
    let logout = document.getElementById("logout");
    let mb = document.getElementById('mblink')
    let about = document.getElementById('about');
    
    about.classList.remove("hide");
    mb.classList.add('hide');
    logout.classList.add('hide');
    btn.classList.remove('hide');
    if (welcome) {
        welcome.parentNode.removeChild(welcome); // Removes the welcome element
    }
    homeactive();

    currentuser = null;
    loggedIn = 0;
    stafflogin = 0;
}

function userchange(n,user){
    if (n==1){
        let login = document.getElementById("logins");
        let btn = document.getElementById("lbtn");
        let logout = document.getElementById("logout");
        let mb = document.getElementById('mblink')
        
        btn.classList.add('hide');
        logout.classList.remove('hide');
        let usertext = document.createElement("a");
        usertext.id = 'welcome';
        usertext.textContent='welcome '+user;
        
        login.appendChild(usertext);
        
        if (loggedIn === 1){
            mb.classList.remove('hide');
        }
    }
}
//L or R or S form change
function changeform(n){
    let logtab = document.getElementById('logintab');
    let regtab = document.getElementById('registertab');
    let log = document.getElementById('L-form');
    let reg = document.getElementById('R-form');
    let Slog = document.getElementById('S-form')
    if (n === 0){
        regtab.classList.remove('hide');
        logtab.classList.remove('hide');
        logtab.classList.remove('inactive-L');
        regtab.classList.add('inactive-R');
        reg.classList.add("hide");
        Slog.classList.add("hide");
        log.classList.remove("hide");
        
        
    }else if(n === 1){
        regtab.classList.remove('hide');
        logtab.classList.remove('hide');
        regtab.classList.remove('inactive-R');
        logtab.classList.add('inactive-L');
        log.classList.add('hide');
        Slog.classList.add("hide");
        reg.classList.remove('hide');
    }else if(n === 2){
        regtab.classList.add('hide');
        logtab.classList.add('hide');
        log.classList.add('hide');
        reg.classList.add("hide");
        Slog.classList.remove("hide");
    }
    
}


//Register account
const Rform = document.getElementById('registerform');
Rform.addEventListener('submit', function (event) {
                            event.preventDefault();
                            
                            const user = document.getElementById('r-username').value;
                            const email = document.getElementById('r-email').value;
                            const password = document.getElementById('r-password').value;
                            const passwordcheck = document.getElementById('re-password').value;
                            
    
    
                            if (password !== passwordcheck) {
                                    alert('Passwords do not match');
                                    return;
                                }
                            else if(user === '' || password === '' || email === ''){
                                alert('No Empty Fields');
                                return;
                            }else if (user == staffuser){
                                alert("user already exists");
                                return;
                            }
                            
                            if(localStorage.getItem(user)){
                                alert("user already exists");
                                return;
                            }else{
                                localStorage.setItem(user,JSON.stringify({user,password}));
                                alert('successful registration');
                                Rform.reset();
                                changeform(0)
                            }
    
                      });
//login
const Lform = document.getElementById('loginform');
Lform.addEventListener('submit', function (event) {
                            event.preventDefault();
                            
                            const user = document.getElementById('username').value;
                            const password = document.getElementById('password').value;
                            
                            
                            const storeduser = JSON.parse(localStorage.getItem(user));
                            if (storeduser && storeduser.password === password){
                                loggedIn = 1;
                                if(loggedIn === 1){
                                    currentuser = storeduser.user;
                                    console.log(currentuser);
                                    alert('logged In');
                                    userchange(loggedIn, user);
                                    homeactive();
                                    Lform.reset();
                                    
                                }
                            }else{
                                    alert('error');
                                    Lform.reset();
                                }
                                
                                
                            });

//staff login
const Sform = document.getElementById('Sloginform');
Sform.addEventListener('submit', function(event){
                        event.preventDefault();
                        const user = document.getElementById('Susername').value;
                        const password = document.getElementById('Spassword').value;
                        
                        if(user == staffuser && password == staffpassword){
                            stafflogin = 1;
                            
                            userchange(stafflogin, staffuser);
                            staffactive();
                            
                        }else{
                            alert('invalid Staff');
                            Sform.reset();
                            
                            return;
                        }
    
    
    
    
});

let count = 0;
function Sconfirm() {    
    const container = document.querySelector('#s_cards');
    
    container.innerHTML = '';
    const selector = []; // Reset selector each time the function is called
    const returncar = [];
    // Loop through bookedlist to find confirmed items
    for (let i = 0; i < bookedlist.length; i++) {
        if (bookedlist[i].confirmation === 1) {
            selector.push(i);
        }
        if(bookedlist[i].confirmation === 3){
            
            returncar.push(i);
            console.log(returncar);
        }
    }

    // Loop through selector and create cards
    for (let k = 0; k < selector.length; k++) {
        const bookCard = document.createElement("div");
        bookCard.className = "bookcard";

        // Create the imgholder div and append image
        const imgHolder = document.createElement("div");
        imgHolder.className = "imgholder";
        const img = document.createElement("img");
        img.src = 'car_img/' + bookedlist[selector[k]].car + '.png';
        imgHolder.appendChild(img);

        // Create the cardtext div
        const cardText = document.createElement("div");
        cardText.className = "cardtext";

        // Create and append car name, pickup location, and user
        const carName = document.createElement("h2");
        carName.textContent = bookedlist[selector[k]].car;
        const pickup = document.createElement("h4");
        pickup.textContent = bookedlist[selector[k]].pickup;
        const user = document.createElement("h4");
        user.textContent = bookedlist[selector[k]].user;

        // Append car name, pickup, and user to cardText
        cardText.appendChild(carName);
        cardText.appendChild(pickup);
        cardText.appendChild(user);

        // Create the form and button for confirmation
        const form = document.createElement("form");
        const button = document.createElement("input");
        button.type = "button";
        button.className = "bookbtn";
        button.value = "confirmation";
        
        // Add click event to button to hide the card and update confirmation
        button.addEventListener('click', () => {
            bookedlist[selector[k]].confirmation = 2;
            bookCard.style.display = 'none';
        });

        form.appendChild(button);
        // Append form to cardText
        cardText.appendChild(form);

        // Append imgholder and cardtext to the main bookCard div
        bookCard.appendChild(imgHolder);
        bookCard.appendChild(cardText);

        // Append the bookCard to the container
        container.appendChild(bookCard);
    };
    
    for (let j = 0; j < returncar.length; j++) {
        const bookCard = document.createElement("div");
        bookCard.className = "bookcard";

        // Create the imgholder div and append image
        const imgHolder = document.createElement("div");
        imgHolder.className = "imgholder";
        const img = document.createElement("img");
        img.src = 'car_img/' + bookedlist[returncar[j]].car + '.png';
        imgHolder.appendChild(img);

        // Create the cardtext div
        const cardText = document.createElement("div");
        cardText.className = "cardtext";

        // Create and append car name, pickup location, and user
        const carName = document.createElement("h2");
        carName.textContent = bookedlist[returncar[j]].car;
        const pickup = document.createElement("h4");
        pickup.textContent = bookedlist[returncar[j]].pickup;
        const user = document.createElement("h4");
        user.textContent = bookedlist[returncar[j]].user;

        // Append car name, pickup, and user to cardText
        cardText.appendChild(carName);
        cardText.appendChild(pickup);
        cardText.appendChild(user);

        // Create the form and button for confirmation
        const form = document.createElement("form");
        const button = document.createElement("input");
        button.type = "button";
        button.className = "bookbtn";
        button.value = "car returned";
        
        // Add click event to button to hide the card and update confirmation
        button.addEventListener('click', () => {
            bookedlist.splice(returncar[j],1);
            bookCard.style.display = 'none';
        });

        form.appendChild(button);
        // Append form to cardText
        cardText.appendChild(form);

        // Append imgholder and cardtext to the main bookCard div
        bookCard.appendChild(imgHolder);
        bookCard.appendChild(cardText);

        // Append the bookCard to the container
        container.appendChild(bookCard);
    }
}

let confirmed = []
function mbcheck(){
    const container = document.querySelector('#mb_cards');
    for (let i = 0; i < bookedlist.length; i++) {
        if (bookedlist[i].confirmation === 2 && bookedlist[i].user == currentuser) {
            confirmed.push(i);
        };
            
   for (let k = 0; k < confirmed.length; k++) {
        const bookCard = document.createElement("div");
        bookCard.className = "bookcard";

        // Create the imgholder div and append image
        const imgHolder = document.createElement("div");
        imgHolder.className = "imgholder";
        const img = document.createElement("img");
        img.src = 'car_img/' + bookedlist[confirmed[k]].car + '.png';
        imgHolder.appendChild(img);

        // Create the cardtext div
        const cardText = document.createElement("div");
        cardText.className = "cardtext";

        // Create and append car name, pickup location, and user
        const carName = document.createElement("h2");
        carName.textContent = bookedlist[confirmed[k]].car;
        const pickup = document.createElement("h4");
        pickup.textContent = bookedlist[confirmed[k]].pickup;
        const user = document.createElement("h4");
        user.textContent = bookedlist[confirmed[k]].user;

        // Append car name, pickup, and user to cardText
        cardText.appendChild(carName);
        cardText.appendChild(pickup);
        cardText.appendChild(user);

        // Create the form and button for confirmation
        const form = document.createElement("form");
        const button = document.createElement("input");
        button.type = "button";
        button.className = "bookbtn";
        button.value = "Return";
        
        // Add click event to button to hide the card and update confirmation
        button.addEventListener('click', () => {
            bookedlist[confirmed[k]].confirmation = 3;
            bookCard.style.display = 'none';
            Sconfirm();
        });

        form.appendChild(button);
        // Append form to cardText
        cardText.appendChild(form);

        // Append imgholder and cardtext to the main bookCard div
        bookCard.appendChild(imgHolder);
        bookCard.appendChild(cardText);

        // Append the bookCard to the container
        container.appendChild(bookCard);
        };
        
    };
}

//check for login for booking
const book = document.getElementById('booked');
book.addEventListener('submit',function(event){
    event.preventDefault();
    
    const pickup = document.getElementById('pickup').value;
    const ptime = document.getElementById('ptime').value;
    const dtime = document.getElementById('dtime').value;
    
    let retpoint;
    
    if(ret === 1){
        retpoint = document.getElementById('return').value;
        console.log(2)
    }else{
        retpoint = document.getElementById('pickup').value;
        console.log(1)
    }
    const data = {
        pickup: pickup,
        retpoint: retpoint,
        ptime: ptime,
        dtime: dtime
    };
    
    bookingdata.push(data);
    
    if(loggedIn == 1){
        bookingactive();
        console.log(bookingdata)
    }else if(loggedIn == 0){
        let bookingprocess = 1;
        alert('please login to continue');
        loginactive();
    }
    
})

const Pform = document.getElementById('p_form');
Pform.addEventListener('submit', function (event) {
                            event.preventDefault();
                            
                            const fname = document.getElementById('fname').value;
                            const Lname = document.getElementById('Lname').value;
            
                            const cnum = document.getElementById('cnum').value;
                            const cvc = document.getElementById('cvc').value;
                            const exp = document.getElementById('expire').value;
                            
                            if (fname != '' && Lname != '' && cnum != '' && cvc !='' && exp != ''   ){
                                if (bookedlist.length > 0) {
                                    bookedlist[0].confirmation = 1;
                                    console.log("Booking confirmed:", bookedlist);
                                    alert('booking is being processed');
                                    homeactive();
                                } else {
                                    alert("No booking selected");
                                }
                            }else{
                                    alert('no empty forms');
                                }
                                
                                
                            });

function availablebookings() {
    const container = document.querySelector('#cards');
    container.innerHTML = ''; // Clear container for fresh content

    for (let i = 0; i < carlist.length; i++) {
        // Main bookcard div
        const bookcard = document.createElement('div');
        bookcard.className = 'bookcard';

        // Image holder div and image element
        const imgholder = document.createElement('div');
        imgholder.className = 'imgholder';
        const img = document.createElement('img');
        img.src = imageList[i];
        imgholder.appendChild(img);

        // Card text div
        const cardtext = document.createElement('div');
        cardtext.className = 'cardtext';

        // Title, price, and location (from bookingdata)
        const title = document.createElement('h2');
        title.innerText = carlist[i];
        const price = document.createElement('h4');
        price.innerText = `${pricelist[i]}/day`;
        const location = document.createElement('h4');
        location.innerText = 'Pickup: '+`${bookingdata[0]?.pickup}`;

        cardtext.appendChild(title);
        cardtext.appendChild(price);
        cardtext.appendChild(location);

        // Amount text
        const amountText = document.createElement('div');
        amountText.className = 'amounttext';
        const amountTextContent = document.createElement('h4');
        amountTextContent.innerText = `${caramt[i]} left`;
        amountText.appendChild(amountTextContent);
        
        // Book button with hidden data fields
        const form = document.createElement('form');
        form.setAttribute('id', carlist[i]);

        // Hidden fields to store data
        const hiddenCar = document.createElement('input');
        hiddenCar.type = 'hidden';
        hiddenCar.name = 'car';
        hiddenCar.value = carlist[i];
        
        const hiddenPickup = document.createElement('input');
        hiddenPickup.type = 'hidden';
        hiddenPickup.name = 'pickup';
        console.log(bookingdata);
        hiddenPickup.value = bookingdata[0]?.pickup;
        
        const hiddenPrice = document.createElement('input');
        hiddenPrice.type = 'hidden';
        hiddenPrice.name = 'price';
        hiddenPrice.value = pricelist[i];

        form.appendChild(hiddenCar);
        form.appendChild(hiddenPickup);
        form.appendChild(hiddenPrice);

        // Book Now button
        const bookBtn = document.createElement('input');
        bookBtn.type = 'button';
        bookBtn.className = 'bookbtn';
        bookBtn.value = 'Book Now';
        
        
        // Add click event to Book Now button
        bookBtn.addEventListener('click', () => {
            // Extract values from hidden fields
            const car = hiddenCar.value;
            const pickup = hiddenPickup.value;
            const price = hiddenPrice.value;
            
            // Show data (or perform booking process here)
            console.log({ car, pickup, price });
            

            const data = {
                car: car,
                pickup: pickup,
                price: price,
                confirmation: 0,
                user: currentuser
            };
            bookedlist.push(data);
            console.log(bookedlist);

            paymentactive();
        });

        // Append elements to form and card
        
        cardtext.appendChild(amountText);
        form.appendChild(bookBtn);
        cardtext.appendChild(form);
        bookcard.appendChild(imgholder);
        bookcard.appendChild(cardtext);
        container.appendChild(bookcard);
        
        
    
    }
}
