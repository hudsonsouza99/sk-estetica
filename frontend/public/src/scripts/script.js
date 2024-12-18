console.log('hello world!'); // Teste de conexão

document.addEventListener('DOMContentLoaded', () => {
    // Seletores
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Função para alternar o menu mobile
    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
        if (menuIcon) {
            menuIcon.classList.toggle('active');
            menuIcon.classList.remove('pulse');
        }
    }

    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Dropdown Menu
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            // Fecha outros dropdowns abertos
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.parentElement.classList.remove('active');
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Alterna o estado do dropdown atual
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            if (isActive) {
                parent.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                parent.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Fecha os dropdowns quando clicar fora
    document.addEventListener('click', function(e) {
        dropdownToggles.forEach(toggle => {
            if (!toggle.contains(e.target) && !toggle.parentElement.contains(e.target)) {
                toggle.parentElement.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Fechar menu com a tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('active');
        }
    });

    // Inicializar Swiper
    var swiper = new Swiper('.elementor-background-slideshow.swiper', {
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 6000, // alternar a cada ~6 segundos
            disableOnInteraction: false,
        },
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    const flipBoxes = document.querySelectorAll('.flip-box-image');

    flipBoxes.forEach(imageContainer => {
      const images = imageContainer.querySelectorAll('img');
      const interval = parseInt(imageContainer.getAttribute('data-interval'), 10) || 4000;
      let currentIndex = 0;
  
      if (images.length > 1) {
        setInterval(() => {
          images[currentIndex].classList.remove('active');
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.add('active');
        }, interval);
      } else {
        // Se só tem uma imagem, já deixa como active
        images[0].classList.add('active');
      }
    });

    ////////////////////////////////////////////////////////////////////////////////
    // Código da Galeria de Imagens - Organizado e Corrigido
    ////////////////////////////////////////////////////////////////////////////////

    // Seleciona os botões "Ver mais" e "Ver menos"
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadLessBtn = document.getElementById('load-less-btn');

    // Seleciona as imagens ocultas
    const hiddenImages = document.querySelectorAll('.hidden-image');

    // Função para mostrar mais imagens
    function showMoreImages() {
        hiddenImages.forEach(img => {
            img.style.display = 'block';
        });
        loadMoreBtn.style.display = 'none';
        loadLessBtn.style.display = 'block';
    }

    // Função para mostrar menos imagens
    function showLessImages() {
        hiddenImages.forEach(img => {
            img.style.display = 'none';
        });
        loadLessBtn.style.display = 'none';
        loadMoreBtn.style.display = 'block';

        // Rolagem suave para o topo da galeria
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Verifica se os botões existem antes de adicionar os event listeners
    if (loadMoreBtn && loadLessBtn) {
        loadMoreBtn.addEventListener('click', showMoreImages);
        loadLessBtn.addEventListener('click', showLessImages);
    } else {
        console.error('Botões "Ver mais" e "Ver menos" não encontrados no DOM.');
    }

    // JavaScript puro para animação suave usando requestAnimationFrame

    // Configurações
    const speed = 0.5; // velocidade do deslocamento (px/frame)

    // Selecionar as rows
    const firstRow = document.querySelector('.first-row');
    const secondRow = document.querySelector('.second-row');

    // Calcularemos a largura total de cada row para saber onde fazer o loop
    // Como temos 6 boxes, calculamos depois do DOM carregado:
    function getRowWidth(row) {
      // Soma as larguras + margens dos children
      let width = 0;
      row.querySelectorAll('.comment-box').forEach(box => {
        width += box.offsetWidth + 45; // offsetWidth + margin-right
      });
      return width;
    }

    // Vamos iniciar a animação após o carregamento
    window.addEventListener('load', () => {
      const firstRowWidth = getRowWidth(firstRow);
      const secondRowWidth = getRowWidth(secondRow);

      // Posições iniciais
      let firstRowPos = -(firstRowWidth / 2);
      let secondRowPos = 0;

      function animate() {
        // First Row (left to right): incrementa a posição
        firstRowPos += speed;
        if (firstRowPos >= 0) {
          firstRowPos = -(firstRowWidth / 2);
        }
        firstRow.style.transform = `translateX(${firstRowPos}px)`;

        // Second Row (right to left): decrementa a posição
        secondRowPos -= speed;
        if (secondRowPos <= -(secondRowWidth / 2)) {
          secondRowPos = 0;
        }
        secondRow.style.transform = `translateX(${secondRowPos}px)`;

        requestAnimationFrame(animate);
      }

      animate();
    });

    // Função para controlar a seção FAQ
    // Seleciona todos os botões de pergunta
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
      button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const faqAnswer = button.nextElementSibling;
        const chevron = button.querySelector('.chevron');

        // Verifica se o item já está ativo
        const isActive = faqItem.classList.contains('active');

        // Fecha todas as FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
          item.querySelector('.faq-answer').style.maxHeight = null;
          item.querySelector('.chevron').classList.remove('fa-chevron-up');
          item.querySelector('.chevron').classList.add('fa-chevron-down');
        });

        // Se não estava ativo, abre
        if (!isActive) {
          faqItem.classList.add('active');
          faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
          chevron.classList.remove('fa-chevron-down');
          chevron.classList.add('fa-chevron-up');
        }
      });
    });

    const brandsWrapper = document.querySelector('.brands-wrapper');
    const brandsContainer = document.querySelector('.brands-container');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    
    const brandItems = document.querySelectorAll('.brand-item');
    const brandItemWidth = brandItems[0].offsetWidth + parseInt(getComputedStyle(brandItems[0]).marginRight);
    const totalBrands = brandItems.length;
    
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Clonar os primeiros n itens e adicioná-los ao final para o loop
    for (let i = 0; i < totalBrands; i++) {
      const clone = brandItems[i].cloneNode(true);
      brandsWrapper.appendChild(clone);
    }
    
    // Atualizar a largura do brands-wrapper
    brandsWrapper.style.width = `${(totalBrands * 2) * brandItemWidth}px`;
    
    // Função para deslizar para a direita
    function slideRight() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      brandsWrapper.style.transition = 'transform 0.5s ease';
      brandsWrapper.style.transform = `translateX(-${currentIndex * brandItemWidth}px)`;
    }
    
    // Função para deslizar para a esquerda
    function slideLeft() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      brandsWrapper.style.transition = 'transform 0.5s ease';
      brandsWrapper.style.transform = `translateX(-${currentIndex * brandItemWidth}px)`;
    }
    
    // Evento de transição finalizada para resetar o carrossel
    brandsWrapper.addEventListener('transitionend', () => {
      isTransitioning = false;
      if (currentIndex >= totalBrands) {
        brandsWrapper.style.transition = 'none';
        currentIndex = 0;
        brandsWrapper.style.transform = `translateX(-${currentIndex * brandItemWidth}px)`;
      } else if (currentIndex < 0) {
        brandsWrapper.style.transition = 'none';
        currentIndex = totalBrands - 1;
        brandsWrapper.style.transform = `translateX(-${currentIndex * brandItemWidth}px)`;
      }
    });
    
    // Botões de navegação
    rightButton.addEventListener('click', slideRight);
    leftButton.addEventListener('click', slideLeft);
    
    // Autoplay
    let autoSlideInterval = setInterval(slideRight, 3000);
    
    // Pausar o autoplay ao passar o mouse sobre a seção
    brandsContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    // Retomar o autoplay ao sair o mouse da seção
    brandsContainer.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(slideRight, 3000);
    });

});
