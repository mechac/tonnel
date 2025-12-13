// Переключение табов
        const tabs = document.querySelectorAll('.tab');
        const tabSlider = document.querySelector('.tab-slider');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const index = Array.from(tabs).indexOf(this);
                const newPosition = index === 0 ? 194 : 12;
                tabSlider.style.left = `${newPosition}px`;
            });
        });

        // Модальное окно для выбора награды
        const modal = document.getElementById('modal');
        const closeModal = document.querySelector('.close-modal');
        const goldItems = document.querySelectorAll('.gold-item');
        let selectedReward = null;

        // Открытие окна выбора награды при загрузке
        window.addEventListener('load', function() {
            setTimeout(() => {
                modal.style.display = 'flex';
            }, 500);
        });

        // Закрытие модального окна
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Выбор награды
        goldItems.forEach(item => {
            item.addEventListener('click', function() {
                goldItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                selectedReward = this.dataset.gold;
                
                // Закрываем окно через 1 секунду
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 1000);
            });
        });

        // Bottom Sheet для промокода
        const bottomSheet = document.getElementById('bottomSheet');
        const bottomSheetOverlay = document.getElementById('bottomSheetOverlay');
        const closeBottomSheet = document.getElementById('closeBottomSheet');
        const promoBtn = document.getElementById('promoBtn');
        const promoForm = document.getElementById('promoForm');
        const promoCodeInput = document.getElementById('promoCodeInput');
        const promoSubmitBtn = document.getElementById('promoSubmitBtn');

        // Открытие Bottom Sheet
        function openBottomSheet() {
            bottomSheetOverlay.style.display = 'block';
            bottomSheet.classList.add('show');
            setTimeout(() => {
                promoCodeInput.focus();
            }, 300);
        }

        // Закрытие Bottom Sheet
        function closeBottomSheetHandler() {
            bottomSheetOverlay.style.display = 'none';
            bottomSheet.classList.remove('show');
            promoCodeInput.value = '';
            promoSubmitBtn.disabled = true;
        }

        // Клик на Промокод в навигации
        promoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openBottomSheet();
        });

        // Закрытие по клику на overlay
        bottomSheetOverlay.addEventListener('click', closeBottomSheetHandler);

        // Закрытие по клику на крестик
        closeBottomSheet.addEventListener('click', closeBottomSheetHandler);

        // Предотвращение закрытия при клике на содержимое
        bottomSheet.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Валидация поля ввода
        promoCodeInput.addEventListener('input', function() {
            const value = this.value.trim();
            promoSubmitBtn.disabled = value.length < 3;
        });

        // Обработка формы
        promoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const promoCode = promoCodeInput.value.trim();
            
            if (promoCode.length >= 3) {
                showToast(`Промокод "${promoCode}" успешно активирован! Награда: ${selectedReward ? selectedReward + ' Голды' : 'не выбрана'}`, 'success');
                closeBottomSheetHandler();
            } else {
                alert('Промокод должен содержать минимум 3 символа');
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
                if (bottomSheet.classList.contains('show')) {
                    closeBottomSheetHandler();
                }
            }
        });

        // Добавление в корзину
        const buyButtons = document.querySelectorAll('.buy-button');
        const cartCount = document.querySelector('.cart-count');
        
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                let currentCount = parseInt(cartCount.textContent);
                cartCount.textContent = currentCount + 1;
                cartCount.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 300);
                
                const goldAmount = this.parentElement.querySelector('.gold-amount').textContent;
                const price = this.textContent;
                alert(`Товар "${goldAmount}" добавлен в корзину за ${price}`);
            });
        });

        // Анимация при загрузке
        document.addEventListener('DOMContentLoaded', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        
        function showToast(message, type = 'info', duration = 5000) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = toast.querySelector('.toast-icon');
            const toastClose = toast.querySelector('.toast-close');
    
            // Устанавливаем сообщение
            toastMessage.textContent = message;
    
            // Устанавливаем тип и иконку
            toast.className = `toast ${type}`;
    
            // Выбираем иконку в зависимости от типа
            const iconClass = type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
            toastIcon.className = `fas ${iconClass} toast-icon`;
    
            // Меняем текст кнопки закрытия в зависимости от типа
            toastClose.textContent = type === 'success' ? 'Отлично!' : 'Закрыть';
    
        // Показываем toast
            toast.classList.add('show');
    
            // Автоматическое скрытие через duration
    const timer = setTimeout(() => {
        hideToast();
    }, duration);
    
            // Сохраняем timer для возможности отмены
            toast.dataset.timer = timer;
        }

        function hideToast() {
            const toast = document.getElementById('toast');
            const timer = toast.dataset.timer;
            
            if (timer) {
                clearTimeout(parseInt(timer));
            }
            
            toast.classList.remove('show');
        }
        