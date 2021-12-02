import requests
from bs4 import BeautifulSoup
import json


class CrawlingOfficeItem:
    BASE_URL = 'https://www.navimro.com'

    def __init__(self):
        self.middle_category = []
        self.middle_categories = []
        self.sub_category = []
        self.sub_categories = []
        self.items = []

    def run(self):
        self.get_middle_category()
        self.get_sub_category()
        self.save_category()
        self.get_items()

    def get_middle_category(self):
        response = requests.get(self.BASE_URL + '/s/c-28')

        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            middle_category = soup.find('ul', {'class': 'lv2-active'}).find_all('a')
            for category in middle_category:
                data = {
                    'main_category': '사무용품',
                    'middle_category': category.string
                }
                self.middle_category.append({
                    'name': category.string,
                    'link': category['href']
                })
                self.middle_categories.append(data)

    def get_sub_category(self):
        for element in self.middle_category:
            response = requests.get(self.BASE_URL + element['link'])

            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html, 'html.parser')
                sub_category = soup.find('ul', {'class': 'lv3-active'}).find_all('a')
                for category in sub_category:
                    data = {
                        'middle_category': element['name'],
                        'sub_category': category.string
                    }
                    self.sub_category.append({
                        'name': category.string,
                        'link': category['href']
                    })
                    self.sub_categories.append(data)

    def save_category(self):
        with open('category.json', 'w+', encoding='UTF-8-sig') as category:
            json.dump({
                'middle_category': self.middle_categories,
                'sub_category': self.sub_categories
            }, category, indent=4, ensure_ascii=False)

    def get_items(self):
        for element in self.sub_category:
            response = requests.get(self.BASE_URL + element['link'])
            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html, 'html.parser')
                items = soup.find('ul', {'class': 'clearFix'}).find_all('li')
                for idx, item in enumerate(items):
                    if idx > 10:
                        break
                    try:
                        name = item['data-item-title']
                        image = item.find('img', {'class': 'grid-img'})['src']
                        price = item.find('span', {'class': 'sale__price'}).find('strong').string
                    except AttributeError:
                        price = 0
                    finally:
                        if price != 0:
                            self.items.append({
                                'sub_category': element['name'],
                                'name': name,
                                'buy_price': price,
                                'sell_price': 0,
                                'image': image,
                                'is_sell': False
                            })

        with open('office.json', 'w', encoding='UTF-8-sig') as items_json:
            json.dump({
                'items': self.items
            }, items_json, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    main = CrawlingOfficeItem()
    main.run()
