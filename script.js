document.addEventListener('DOMContentLoaded', () => {
    // Tính năng 1: Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    const htmlElement = document.documentElement;

    // Kiểm tra localStorage
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        setDarkIcon();
    } else {
        htmlElement.classList.remove('dark');
        setLightIcon();
    }

    function setDarkIcon() {
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
        themeIconMobile?.classList.replace('fa-moon', 'fa-sun');
    }

    function setLightIcon() {
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
        themeIconMobile?.classList.replace('fa-sun', 'fa-moon');
    }

    function toggleTheme() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setLightIcon();
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkIcon();
        }
    }

    themeToggleBtn?.addEventListener('click', toggleTheme);
    themeToggleBtnMobile?.addEventListener('click', toggleTheme);

    // Tính năng 2 & 3: Hamburger menu toggle & Close on link click (Smooth scroll via CSS scroll-behavior)
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Tính năng 4: Filter Projects
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(filterBtn => {
                const isActive = filterBtn === btn;
                filterBtn.classList.toggle('is-active', isActive);
                filterBtn.setAttribute('aria-pressed', String(isActive));
            });

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('is-hidden');
                    requestAnimationFrame(() => card.classList.remove('is-hiding'));
                } else {
                    card.classList.add('is-hiding');
                    setTimeout(() => {
                        if (card.classList.contains('is-hiding')) {
                            card.classList.add('is-hidden');
                        }
                    }, 250);
                }
            });
        });
    });

    // Tính năng phụ (Tính năng 5.1): Đếm ký tự textarea
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const maxLength = 500;

    messageInput.addEventListener('input', () => {
        const currentLength = messageInput.value.length;
        charCount.textContent = `${currentLength}/${maxLength} ký tự`;
        if (currentLength > maxLength) {
            charCount.classList.add('is-over-limit');
        } else {
            charCount.classList.remove('is-over-limit');
        }
    });

    // Tính năng 5: Form Validation
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(inputId, errorId) {
        document.getElementById(inputId).classList.add('is-invalid');
        document.getElementById(errorId).classList.remove('is-hidden');
    }

    function clearError(inputId, errorId) {
        document.getElementById(inputId).classList.remove('is-invalid');
        document.getElementById(errorId).classList.add('is-hidden');
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = messageInput.value.trim();

        // Validate Tên
        if (name === '') {
            showError('name', 'name-error');
            isValid = false;
        } else {
            clearError('name', 'name-error');
        }

        // Validate Email
        if (email === '' || !isValidEmail(email)) {
            showError('email', 'email-error');
            isValid = false;
        } else {
            clearError('email', 'email-error');
        }

        // Validate Message
        if (message === '' || message.length > maxLength) {
            showError('message', 'message-error');
            isValid = false;
        } else {
            clearError('message', 'message-error');
        }

        // Kết quả
        if (isValid) {
            formMessage.textContent = 'Gửi tin nhắn thành công!';
            formMessage.className = 'form-message is-success';
            contactForm.reset();
            charCount.textContent = `0/${maxLength} ký tự`;
            charCount.classList.remove('is-over-limit');

            // Ẩn thông báo sau 3s
            setTimeout(() => {
                formMessage.classList.add('is-hidden');
            }, 3000);
        } else {
            formMessage.textContent = 'Vui lòng kiểm tra lại thông tin đã nhập.';
            formMessage.className = 'form-message is-error';
        }
    });

    // Tính năng 6: Hiển thị năm hiện tại ở Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});