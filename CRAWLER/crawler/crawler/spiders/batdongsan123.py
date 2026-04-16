import scrapy
from scrapy.selector import Selector
from ..items import CrawlBatdongsan123

class BatdongsanSpider(scrapy.Spider):
    i=1
    name = "bds123"
    base_url="https://bds123.vn/ban-nha.html?page="
    def start_requests(self):
        start_urls=[
            "https://bds123.vn/ban-nha.html"
        ]
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('article a::attr(href)').getall()
        for link_detail in products:
            # link_detail = product.css('a::attr(href)').extract_first()
            yield response.follow(link_detail, self.parse_detail)

        if self.i < 1:
            self.i += 1
            path_next = self.base_url +str(self.i)
            yield response.follow(path_next, callback=self.parse)

    def parse_detail(self, response):
        item = CrawlBatdongsan123()
        item['title'] = response.css('article header h1::text').get()
        item['description'] = response.css('div.lh-17 p::text').getall()
        item['url_page'] = response.request.url
        item['price'] = response.css('div.fs-5-5::text').get()
        item['bedroom'] = response.css('.table__dacdiemnhadat tr:nth-child(8) td.w-100::text').get()
        item['bathroom'] = response.css('.table__dacdiemnhadat tr:nth-child(9) td.w-100::text').get()
        item['acreage'] = response.css('.table__dacdiemnhadat tr:nth-child(3) td.w-100::text').get()
        item['direction'] = response.css('.table__dacdiemnhadat tr:nth-child(11) td.w-100::text').get()
        item['date'] = response.css('body > div.container.mt-4 > div > main > article > header > div.d-flex.justify-content-between > div:nth-child(2)::text').get()
        item['name_contact'] = response.css('body > div.container.mt-4 > div > main > article > section:nth-child(6) > div > div > a > div.fs-5-5.fw-medium.me-3::text').get()
        item['project'] = response.css('body > div.container.mt-4 > div > main > article > section.base-card.mb-3.fs-7 > div > div:nth-child(3) > div:nth-child(2)::text').get()
        item['phone_contact'] = response.css('body > div.container.mt-4 > div > main > article > section:nth-child(6) > div > div > div.d-flex.mt-3 > a.btn.btn-green.border-2.text-white.d-flex.justify-content-center.rounded-4.user-select-all::text').get()
        item['address'] = response.css("body > div.container.mt-4 > div > main > article > header > div:nth-child(3) > div.col-10.text-black > div:nth-child(1)::text").get()
        item['link_image'] = response.css('#carousel_Photos > div.carousel-inner.bg-dark.rounded-top-4.position-relative > div.carousel-item.active > img::attr(src)').extract_first()
        item['code'] = response.css('body > div.container.mt-4 > div > main > article > section.base-card.mb-3.fs-7 > div > div:nth-child(4) > div:nth-child(2)::text').get()
        item['type'] = '0'
        yield item



