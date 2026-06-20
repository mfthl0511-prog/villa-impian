// ===== Data Villa =====
const villas = [
    { id: 1, name: "Villa Alam Asri", location: "Bali", price: 1500000, img: "villa alam asri.jpg", desc: "Villa nyaman dengan suasana alam yang tenang." },
    { id: 2, name: "Villa Green Park", location: "Lombok", price: 2000000, img: "villa green pack.jpg", desc: "Villa modern dengan taman hijau yang asri." },
    { id: 3, name: "Villa Harmoni", location: "Bandung", price: 1800000, img: "villa harmoni.jpg", desc: "Villa keluarga dengan udara sejuk pegunungan." },
    { id: 4, name: "Villa Family", location: "Bali", price: 2500000, img: "villa family.jpg", desc: "Villa luas cocok untuk liburan keluarga besar." },
    { id: 5, name: "Villa Luxury", location: "Lombok", price: 3000000, img: "villa luxury.jpg", desc: "Villa mewah dengan fasilitas premium." },
    { id: 6, name: "Villa Panorama", location: "Bandung", price: 2200000, img: "villa panorama.jpg", desc: "Villa dengan pemandangan alam yang menakjubkan." },
    { id: 7, name: "Villa Sunset", location: "Bali", price: 2800000, img: "villa sunset.jpg", desc: "Nikmati sunset indah dari villa ini." },
    { id: 8, name: "Villa Mountain", location: "Bandung", price: 1700000, img: "villa mountain.jpg", desc: "Villa di kaki gunung dengan udara segar." },
    { id: 9, name: "Villa Beach", location: "Lombok", price: 2600000, img: "villa beach.jpg", desc: "Villa dekat pantai dengan pemandangan laut." }
];

const formatRupiah = (num) => "Rp " + num.toLocaleString("id-ID");

function renderVillaCard(villa) {
    return `
        <div class="col-md-4 fade-in">
            <div class="card villa-card h-100 shadow-sm">
                <img src="${villa.img}" class="card-img-top" alt="${villa.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="fw-bold">${villa.name}</h5>
                    <p class="location mb-1"><i class="bi bi-geo-alt-fill text-success"></i> ${villa.location}</p>
                    <p class="small text-muted">${villa.desc}</p>
                    <div class="mt-auto">
                        <p class="price mb-3">${formatRupiah(villa.price)} <small class="text-muted fw-normal">/ malam</small></p>
                        <a href="detail.html" class="btn btn-success w-100">
                            <i class="bi bi-eye"></i> Detail
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderVillaList(list, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = '';
        const noResult = document.getElementById('noResult');
        if (noResult) noResult.classList.remove('d-none');
        return;
    }

    const noResult = document.getElementById('noResult');
    if (noResult) noResult.classList.add('d-none');

    container.innerHTML = list.map(renderVillaCard).join('');
    observeFadeIn();
}

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => loader.classList.add('hide'), 500);
    }
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    const btn = document.getElementById('backToTop');
    if (btn) {
        btn.classList.toggle('show', window.scrollY > 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('backToTop');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (document.getElementById('villaList')) {
        renderVillaList(villas.slice(0, 6), 'villaList');
    }

    if (document.getElementById('collectionList')) {
        renderVillaList(villas, 'collectionList');
    }

    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const name = document.getElementById('searchName').value.toLowerCase();
            const loc = document.getElementById('searchLocation').value;
            const maxPrice = parseInt(document.getElementById('searchPrice').value) || Infinity;

            const filtered = villas.filter(v =>
                v.name.toLowerCase().includes(name) &&
                (loc === '' || v.location === loc) &&
                v.price <= maxPrice
            );

            renderVillaList(filtered, 'villaList');
            showToast(`Ditemukan ${filtered.length} villa`);

            document.getElementById('villaList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const btnFilter = document.getElementById('btnFilter');
    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            const name = document.getElementById('filterName').value.toLowerCase();
            const loc = document.getElementById('filterLocation').value;
            const sort = document.getElementById('filterSort').value;

            let filtered = villas.filter(v =>
                v.name.toLowerCase().includes(name) &&
                (loc === '' || v.location === loc)
            );

            if (sort === 'low') filtered.sort((a, b) => a.price - b.price);
            if (sort === 'high') filtered.sort((a, b) => b.price - a.price);

            renderVillaList(filtered, 'collectionList');
            showToast(`Ditemukan ${filtered.length} villa`);
        });
    }

    const nightsInput = document.getElementById('nights');
    const totalPrice = document.getElementById('totalPrice');
    if (nightsInput && totalPrice) {
        nightsInput.addEventListener('input', () => {
            const nights = parseInt(nightsInput.value) || 1;
            totalPrice.textContent = formatRupiah(1500000 * nights);
        });
    }

    const btnBooking = document.getElementById('btnBooking');
    if (btnBooking) {
        btnBooking.addEventListener('click', () => {
            showToast('Booking berhasil! Silakan cek email Anda 🎉');
        });
    }

    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(loginForm)) return;
            showToast('Login berhasil! Selamat datang kembali 👋');
            setTimeout(() => window.location.href = 'index.html', 1500);
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(registerForm)) return;
            showToast('Registrasi berhasil! Silakan login 🎉');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(contactForm)) return;
            showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda ✉️');
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    observeFadeIn();
});

function validateForm(form) {
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    return true;
}

function showToast(message) {
    const toastEl = document.getElementById('liveToast');
    if (!toastEl) {
        alert(message);
        return;
    }
    document.getElementById('toastMessage').textContent = message;
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}

function observeFadeIn() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}