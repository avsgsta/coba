'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */
const slider = document.querySelector('[data-slider]');
    const sliderContainer = slider.querySelector('[data-slider-container]');
    const sliderItems = sliderContainer.querySelectorAll('.slider-item');
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');

    let currentIndex = 0;
    const slideInterval = 3000; // Interval waktu slide (dalam milidetik)

    function slideTo(index) {
        currentIndex = index;
        const offset = -index * sliderItems[0].offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % sliderItems.length;
        slideTo(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        slideTo(prevIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-slide
    let autoSlideInterval = setInterval(nextSlide, slideInterval);

    // Pause auto-slide when hovering over slider
    slider.addEventListener('mouseover', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    });

/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }

        document.addEventListener("DOMContentLoaded", function() {
            const chatPopup = document.getElementById("chatbot-popup");
            const chatBtn = document.getElementById("chat-btn");
            const closeBtn = document.getElementById("close-btn");
            const optionButtons = document.querySelectorAll(".option-btn");
            const chatContent = document.getElementById("chat-content");

            // Fungsi untuk membuka popup
            chatBtn.onclick = function() {
                chatPopup.style.display = "flex";
            };

            // Fungsi untuk menutup popup
            closeBtn.onclick = function() {
                chatPopup.style.display = "none";
            };

            // Fungsi untuk menambahkan pesan ke chat
            function tambahPesan(sender, text) {
                const pesanDiv = document.createElement("div");
                pesanDiv.className = sender === "User" ? "user-message" : "bot-message";
                pesanDiv.textContent = text;
                chatContent.appendChild(pesanDiv);
                chatContent.scrollTop = chatContent.scrollHeight; // Autoscroll ke pesan terbaru
            }

            // Fungsi respons bot untuk pertanyaan seputar Badan Karantina
            function balasBot(userText) {
                let botResponse = "Maaf, saya tidak mengerti pertanyaan Anda.";

                // Logika respons berdasarkan pertanyaan pengguna
                if (userText.toLowerCase().includes("tugas badan karantina")) {
                    botResponse = "Tugas Badan Karantina adalah mencegah masuk dan tersebarnya hama penyakit hewan karantina dan organisme pengganggu tumbuhan karantina dari luar negeri dan antar area di dalam negeri.";
                } else if (userText.toLowerCase().includes("fungsi badan karantina")) {
                    botResponse = "Fungsi Badan Karantina antara lain adalah pengawasan dan pengendalian terhadap lalu lintas hewan, tumbuhan, dan produk pertanian yang berpotensi membawa hama penyakit.";
                } else if (userText.toLowerCase().includes("lokasi badan karantina")) {
                    botResponse = "Badan Karantina tersebar di berbagai pelabuhan, bandara, dan perbatasan di seluruh Indonesia.";
                } else if (userText.toLowerCase().includes("kontak badan karantina")) {
                    botResponse = "Anda dapat menghubungi Badan Karantina di nomor telepon (021) 7816480 atau email ke info@karantina.id.";
                } else if (userText.toLowerCase().includes("halo")) {
                    botResponse = "Halo! Ada yang bisa saya bantu terkait Badan Karantina?";
                } else if (userText.toLowerCase().includes("terima kasih")) {
                    botResponse = "Sama-sama! Jika ada pertanyaan lain, jangan ragu untuk bertanya.";
                }

                setTimeout(() => tambahPesan("Bot", botResponse), 1000);
            }

            // Event handler untuk tombol opsi
            optionButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const question = this.getAttribute("data-question");
                    tambahPesan("User", question);
                    balasBot(question);
                });
            });
        });