(() => {
    'use strict';

    const ITEMS = window.SHOP_ITEMS || [];

    const PAYMENT_URL = 'https://t.me/macclient11';

    const itemsList = document.getElementById('items_list');
    const itemInfo = document.getElementById('item_info');

    function renderItems() {
        itemsList.innerHTML = '';
        ITEMS.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'item' + (i === 0 ? ' active' : '');
            div.dataset.index = i;
            div.innerHTML = '<span class="img"><img src="assets/img/items/' + item.id + '.png" alt="" loading="lazy"></span>' +
                '<span class="name">' + item.name + '</span>' +
                '<span class="price">' + item.price + '</span>';
            div.addEventListener('click', () => selectItem(i));
            itemsList.appendChild(div);
        });
    }

    function selectItem(index) {
        const item = ITEMS[index];
        if (!item) return;
        document.querySelectorAll('.items_list .item').forEach((r) => {
            r.classList.toggle('active', Number(r.dataset.index) === index);
        });
        itemInfo.innerHTML = item.info;
    }

    // Клики в карточке товара: выбор срока + кнопка покупки
    itemInfo.addEventListener('click', (e) => {
        const methodTab = e.target.closest && e.target.closest('#method_select p');
        if (methodTab) {
            methodTab.parentElement.querySelectorAll('p').forEach((p) => p.classList.remove('active'));
            methodTab.classList.add('active');
            const price = (methodTab.dataset.price || '').trim();
            const priceSpan = itemInfo.querySelector('#info_price .price span');
            const buyBtn = itemInfo.querySelector('#buy_button');
            if (priceSpan && price) priceSpan.textContent = price + ' руб';
            if (buyBtn) {
                buyBtn.dataset.price = price;
                buyBtn.dataset.method = methodTab.dataset.id;
            }
            return;
        }

        const buyBtn = e.target.closest && e.target.closest('#buy_button');
        if (buyBtn) {
            const a = document.createElement('a');
            a.href = PAYMENT_URL;
            a.target = '_blank';
            a.rel = 'noopener';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    });

    if (ITEMS.length) {
        renderItems();
        itemInfo.innerHTML = ITEMS[0].info;
    }
})();