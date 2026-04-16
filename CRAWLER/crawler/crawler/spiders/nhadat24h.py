import scrapy
from scrapy.selector import Selector
from ..items import CrawlNhadat24h

class BatdongsanSpider(scrapy.Spider):
    i=1
    base_url = "https://nhadat24h.net.vn/danh-muc/nha-dat-ban/50?page="
    name = "nhadat24h"
    def start_requests(self):
        start_urls=[]
        i = 1
        for j in range(500):
            url = self.base_url + str(i)
            i=i+1
            start_urls.append(url)

        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('.item')
        for product in products:
            link_detail = product.css('.ct-title > a::attr(href)').extract_first()
            print(link_detail)
            # self.link_page = link_detail
            yield response.follow(link_detail, self.parse_detail)

    def parse_detail(self, response):
        item = CrawlNhadat24h()
        item['title'] = response.css('.row h1::text').extract_first()
        item['url_page'] = response.request.url
        item['code'] = response.css('div.col-md-5 p:first-child::text').get()
        item['price'] = response.css('span.gia-ban::text').getall()[-1].strip()
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

        des = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(7) > td p::text').getall()
        if len(des) == 0:
            des = response.css(
            '#page-news > div.table-responsive > table > tbody > tr:nth-child(7) > td::text').getall()
        item['description'] = des
        item['name_contact'] = response.css('#page-news > div:nth-child(7) > div.px-1 > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(2) > a::text').get().strip()
        item['phone_contact'] = response.css('#page-news > div:nth-child(7) > div.px-1 > div.table-responsive > table > tbody > tr:nth-child(3) > td:nth-child(2) > a::text').get().strip()
            
        item['type'] = '0'

        yield item