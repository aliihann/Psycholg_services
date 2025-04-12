// Ждем полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  
  // ======= АНИМАЦИЯ ПРИ ПРОКРУТКЕ =======
  // Получаем все элементы с классом animate-fade-in для анимации
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  // Функция для проверки, находится ли элемент в видимой области экрана
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }
  
  // Функция для анимации элементов при прокрутке
  function checkElements() {
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.style.animationPlayState = 'running';
      }
    });
  }
  
  // Вызываем функцию при загрузке и при прокрутке
  checkElements();
  window.addEventListener('scroll', checkElements);
  
  // ======= ФИКСИРОВАННОЕ МЕНЮ ПРИ ПРОКРУТКЕ =======
  const header = document.querySelector('.header');
  
  // Функция для изменения стиля меню при прокрутке
  function toggleScrolledHeader() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Вызываем функцию при загрузке и при прокрутке
  toggleScrolledHeader();
  window.addEventListener('scroll', toggleScrolledHeader);
  
  // ======= МОБИЛЬНОЕ МЕНЮ =======
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navList.classList.toggle('active');
    });
  }
  
  // Закрытие мобильного меню при клике на ссылку
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  });
  
  // ======= АККОРДЕОН ДЛЯ FAQ =======
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Закрываем все остальные элементы FAQ
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Открываем/закрываем текущий элемент
      item.classList.toggle('active');
    });
  });
  
  // ======= КНОПКА "НАВЕРХ" =======
  const backToTop = document.querySelector('.back-to-top');
  
  function toggleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
  
  // Плавная прокрутка при клике на кнопку "Наверх"
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ======= ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК =======
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const target = document.querySelector(link.getAttribute('href'));
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100, // Отступ сверху, чтобы учесть фиксированное меню
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ======= ВАЛИДАЦИЯ ФОРМЫ =======
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Получаем значения полей формы
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      
      // Простая валидация
      let isValid = true;
      
      if (name === '') {
        showError('name', 'Пожалуйста, введите ваше имя');
        isValid = false;
      } else {
        removeError('name');
      }
      
      if (phone === '') {
        showError('phone', 'Пожалуйста, введите ваш телефон');
        isValid = false;
      } else {
        removeError('phone');
      }
      
      if (email === '') {
        showError('email', 'Пожалуйста, введите ваш email');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Пожалуйста, введите корректный email');
        isValid = false;
      } else {
        removeError('email');
      }
      
      // Если все поля валидны, отправляем форму
      if (isValid) {
        // В реальном проекте здесь будет отправка формы на сервер
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Имитация отправки данных
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Показываем сообщение об успешной отправке
          alert('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
        }, 1500);
      }
    });
  }
  
  // Функция для отображения ошибки валидации
  function showError(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    const errorElement = input.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      const error = document.createElement('div');
      error.classList.add('error-message');
      error.style.color = 'var(--error)';
      error.style.fontSize = '0.8rem';
      error.style.marginTop = '0.3rem';
      error.textContent = errorMessage;
      
      input.parentNode.insertBefore(error, input.nextSibling);
    } else {
      errorElement.textContent = errorMessage;
    }
    
    input.style.borderColor = 'var(--error)';
  }
  
  // Функция для удаления ошибки валидации
  function removeError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = input.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
    
    input.style.borderColor = '';
  }
  
  // Функция для валидации email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // ======= ТЕСТИМОНИАЛЫ (СЛАЙДЕР С ОТЗЫВАМИ) =======
  const testimonialsSlider = document.querySelector('.testimonials-slider');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  if (testimonialCards.length > 1 && window.innerWidth > 768) {
    let currentIndex = 0;
    
    // Функция для показа следующего слайда
    function showNextSlide() {
      testimonialCards.forEach((card, index) => {
        if (index === currentIndex) {
          card.style.opacity = '1';
          card.style.transform = 'translateX(0) scale(1)';
        } else {
          card.style.opacity = '0.5';
          card.style.transform = 'translateX(-10px) scale(0.95)';
        }
      });
      
      currentIndex = (currentIndex + 1) % testimonialCards.length;
    }
    
    // Автоматическая смена отзывов каждые 5 секунд
    setInterval(showNextSlide, 5000);
  }
});