import requests
from bs4 import BeautifulSoup


class CrawlingMovieAgeRate:
    BASE_URL = 'https://movie.naver.com'

    def __init__(self):
        pass

    def get_movie_code_by_title(self, title):
        response = requests.get(self.BASE_URL + f'/movie/search/result.naver?query={str(title)}&section=all&ie=utf8')
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            code = soup.find('p', {'class': 'result_thumb'})
            if code:
                code = code.find('a')['href'].split('code=')[-1]
                return code
        return None

    def get_age_rate_by_code(self, movie_code):
        if movie_code is None:
            return

        response = requests.get(
            self.BASE_URL + f'/movie/bi/mi/basic.naver?code={movie_code}')
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            age_rate = []
            try:
                percentages = soup.find('div', {'class': 'bar_graph'}).find_all('div', {'class': 'graph_box'})
                for percentage in percentages:
                    age_rate.append(int(percentage.find('strong', {'class': 'graph_percent'}).get_text().replace('%', '')) / 100)
            except AttributeError or TypeError as e:
                print(e)
                age_rate = [0.2, 0.2, 0.2, 0.2, 0.2]
            finally:
                return age_rate


if __name__ == '__main__':
    main = CrawlingMovieAgeRate()
    code = main.get_movie_code_by_title('십개월의 미래')
    print(main.get_age_rate_by_code(code))
