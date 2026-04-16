
import scrapy
from scrapy.selector import Selector
from ..items import CrawlAlonhadatItem

class BatdongsanSpider(scrapy.Spider):
    i=198
    name = "alonhadat"
    base_url="https://alonhadat.com.vn/can-ban-nha-dat/"
    def start_requests(self):
        start_urls=[]
        for j in range(2):
            start_urls.append(f"{self.base_url}/trang-{self.i+j}")
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('.property-item')
        for product in products:
            link_detail = product.css('a::attr(href)').get()
            yield response.follow(link_detail, self.parse_detail)

    def parse_detail(self, response):
        item = CrawlAlonhadatItem()
        item['title'] = response.css('.property > .title > h1::text').get()
        item['introduce_contact'] = response.css('.contact > .contact-info > .content > .introduce::text').get()
        item['link_image'] = response.css('.property > .images > .imageview > img::attr(src)').get()
        item['name_contact'] = response.css('.contact > .contact-info > .content > .name::text').get()
        item['phone_contact'] = response.css('.contact > .contact-info > .content > .fone > a::text').get()
        item['url_page'] = response.request.url
        item['date'] = response.css('time.date::text').get()
        item['price'] = response.css('data.value::text').get()
        item['square'] = response.css('.area [itemprop="value"]::text').get()
        item['width'] = response.css('.moreinfor1 tr:nth-child(4) td:nth-child(2)::text').get()
        item['length'] = response.css('.moreinfor1 tr:nth-child(5) td:nth-child(2)::text').get()
        item['code'] = response.css('.moreinfor1 tr:nth-child(1) td:nth-child(2)::text').get()
        item['direct'] = response.css('.moreinfor1 tr:nth-child(1) td:nth-child(4)::text').get()
        item['bedroom'] = response.css('.moreinfor1 tr:nth-child(5) td:nth-child(4)::text').get()
        item['kitchen'] = response.css('.moreinfor1 tr:nth-child(2) td:nth-child(6) img::attr(src)').get()
        item['diningroom'] = response.css('.moreinfor1 tr:nth-child(1) td:nth-child(6) img::attr(src)').get()
        item['road_width'] = response.css('.moreinfor1 tr:nth-child(2) td:nth-child(4)::text').get()
        item['floor'] = response.css('.moreinfor1 tr:nth-child(4) td:nth-child(4)::text').get()
        item['terrace'] = response.css('.moreinfor1 tr:nth-child(3) td:nth-child(6) img::attr(src)').get()
        item['parking'] = response.css('.moreinfor1 tr:nth-child(4) td:nth-child(6) img::attr(src)').get()
        item['juridical'] = response.css('.moreinfor1 tr:nth-child(3) td:nth-child(4)::text').get()
        item['project'] = response.css('.moreinfor1 tr:nth-child(6) td:nth-child(2)::text').get()
        item['description'] = response.css('section.detail.text-content > p::text').get()
        item['address'] = response.css('.old-address ::text').get()
        item['type'] = '0'

        yield item
