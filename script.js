// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})



// rotate text js code 
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");


// switch between about buttons 

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    contents.forEach(content => content.style.display = 'none');
    contents[index].style.display = 'block';
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});



// portfolio fillter 

var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});


// Initialize swiperjs 

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
        delay:2500,
        disableOnInteraction:false,
    },

    breakpoints: {
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        },
    }
  });



//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
    if(!skillsPlayed)
    skillsCounter();
})


function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;
    return false;
}

function updateCount(num,maxNum){
    let currentNum = +num.innerText;
    
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(()=>{
            updateCount(num,maxNum)
        },12)
    }
}


let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill))return;
    skillsPlayed = true;
    sk_counters.forEach((counter,i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(()=>{
            updateCount(counter,target);
        },400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}


// side progress bar 

let calcScrollValue = ()=>{
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);
    
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click",()=>{
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);

// scroll reveal

ScrollReveal({ 
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.classList.toggle('dark-mode');
    });

    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('theme-icon').textContent = isDarkMode ? '🌙' : '🌞';
});




// Teks yang ingin ditampilkan
const texts = ["Frontend Developer", "UI/UX Designer", "Designer"];
let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;
const typeSpeed = 150; // Kecepatan pengetikan (ms)
const deleteSpeed = 100; // Kecepatan menghapus (ms)
const delayBetweenTexts = 1500; // Waktu tunggu antar teks (ms)
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
    if (index < texts.length) {
        currentText = texts[index];
        
        // Tambahkan atau hapus karakter berdasarkan status 'isDeleting'
        if (!isDeleting) {
            typewriterElement.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            // Set lebar elemen berdasarkan panjang teks
            typewriterElement.style.width = charIndex + "ch";
            
            // Ketika seluruh teks sudah diketik, mulai menghapus
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenTexts); // Tunggu sebelum menghapus
                return;
            }
        } else {
            typewriterElement.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            // Set lebar elemen berdasarkan panjang teks
            typewriterElement.style.width = charIndex + "ch";
            
            // Ketika seluruh teks sudah terhapus, pindah ke teks berikutnya
            if (charIndex === 0) {
                isDeleting = false;
                index++;
                
                if (index === texts.length) {
                    index = 0; // Ulang dari teks pertama
                }
            }
        }
        
        // Sesuaikan kecepatan pengetikan dan penghapusan
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(typeEffect, speed);
    }
}

// Mulai efek ketikan
typeEffect();

document.getElementById('whatsappForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah pengiriman form default

    // Ambil nilai dari input form
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    // Format pesan yang dikirim ke WhatsApp
    let whatsappMessage = `Nama depan: ${firstName}%0ANama belakang: ${lastName}%0AEmail: ${email}%0ASubject: ${subject}%0APesan: ${message}`;

    // Ganti dengan nomor WhatsApp Anda
    let phoneNumber = "6285273418848"; // Ganti dengan nomor Anda

    // Buat URL untuk WhatsApp
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Buka URL WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
});

