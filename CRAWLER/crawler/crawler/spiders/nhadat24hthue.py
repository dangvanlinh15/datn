import scrapy
from scrapy.selector import Selector
from ..items import CrawlNhadat24h
from tqdm import tqdm

class BatdongsanSpider(scrapy.Spider):
    i=1
    base_url = "https://nhadat24h.net.vn/danh-muc/nha-dat-cho-thue/51?page="
    name = "nhadat24h1"
    def start_requests(self):
        start_urls=[]
        i = 1
        for _ in range(10):
            url = self.base_url + str(i)
            i=i+1
            start_urls.append(url)

        for url in start_urls:
            print(url)
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        print("url==", response.request.url)
        products = response.css('.item')
        for product in products:
            link_detail = product.css('.ct-title > a::attr(href)').get()
            # self.link_page = link_detail
            yield response.follow(link_detail, self.parse_detail)
            # break

    def parse_detail(self, response):

        item = CrawlNhadat24h()
        item['title'] = response.css('.row h1::text').get()
        item['url_page'] = response.request.url
        item['code'] = response.css('div.col-md-5 p:first-child::text').get()
        try:
            item['price'] = response.css('span.gia-ban::text').getall()[-1].strip()
        except:
            item['price'] = None

        item['width'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(1)::text').get().strip()
        item['length'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(2)::text').get().strip()
        item['juridical'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(3)::text').get().strip()
        item['ground_area'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(1)::text').get().strip()
        item['usable_area'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(2)::text').get().strip()
        item['direct'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(3)::text ').get().strip()
        item['floor'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(3) > td:nth-child(1)::text').get().strip()
        item['bedroom'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(3) > td:nth-child(2)::text').get().strip()
        item['livingroom'] = response.css(
            ' #page-news > div.table-responsive > table > tbody > tr:nth-child(3) > td:nth-child(3)::text').get().strip()
        item['kitchen'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(4) > td:nth-child(1)::text').get().strip()
        item['terrace'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(4) > td:nth-child(2)::text').get().strip()
        item['parking'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(4) > td:nth-child(3)::text').get().strip()
        item['bathroom'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(5) > td:nth-child(1)::text').get().strip()
        item['road_width'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(5) > td:nth-child(2)::text').get().strip()
        item['link_image'] = response.css('#expandedImg::attr(src)').get().strip()
        item['name_project'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(6) > td::text').get().strip()

        item['address'] = response.css(
            '#page-news > div.row.thong-tin-chi-tiet > div:nth-child(4) > p:nth-child(1)::text').get().strip()
        item['specific_address'] = response.css(
            '#page-news > div.row.thong-tin-chi-tiet > div:nth-child(4) > p:nth-child(2)::text ').get().strip()
        item['date'] = response.css('#page-news > div.row.thong-tin-chi-tiet > div:nth-child(4) > p:nth-child(3)::text').get().strip()

        item['description'] = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(7) > td p::text').getall()
        
        item['type'] = '1'

        yield item