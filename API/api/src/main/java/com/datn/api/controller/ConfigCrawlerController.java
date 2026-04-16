package com.datn.api.controller;

import com.datn.api.dto.ConfigCrawlerDto;
import com.datn.api.dto.UserDto;
import com.datn.api.model.ConfigCrawler;
import com.datn.api.model.User;
import com.datn.api.repository.ConfigCrawlerRepository;
import com.datn.api.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class ConfigCrawlerController {

    private final ConfigCrawlerRepository configCrawlerRepository;

    public ConfigCrawlerController(ConfigCrawlerRepository configCrawlerRepository) {
        this.configCrawlerRepository = configCrawlerRepository;
    }

    @GetMapping("/configCrawler/findAll")
    public ResponseEntity<List<ConfigCrawler>> getAllConfigCrawler() {

        return ResponseEntity.ok(this.configCrawlerRepository.findAll());
    }

//    @PostMapping("/configCrawler/create")
//    public ResponseEntity<ConfigCrawler> createConfigCrawler(@RequestBody ConfigCrawlerDto.RequestDto requestDto) {
//
//        ConfigCrawler configCrawler = new ConfigCrawler();
//        configCrawler.setTitlePage(requestDto.getTitlePage());
//        configCrawler.setTitleQuery(requestDto.getTitleQuery());
//        configCrawler.setUrlPage(requestDto.getUrlPage());
//        configCrawler.setDescriptionQuery(requestDto.getDescriptionQuery());
//        configCrawler.setPriceQuery(requestDto.getPriceQuery());
//        configCrawler.setImageUrlQuery(requestDto.getImageUrlQuery());
//        configCrawler.setAcreageQuery(requestDto.getAcreageQuery());
//        configCrawler.setAddressQuery(requestDto.getAddressQuery());
//        configCrawler.setDirectionQuery(requestDto.getDirectionQuery());
//        configCrawler.setDateQuery(requestDto.getDateQuery());
//        configCrawler.setNameContactQuery(requestDto.getNameContactQuery());
//        configCrawler.setPhoneContactQuery(requestDto.getPhoneContactQuery());
//        configCrawler.setBedRoomQuery(requestDto.getBedRoomQuery());
//        configCrawler.setBathRoomQuery(requestDto.getBathRoomQuery());
//        configCrawler.setUrlPage(requestDto.getUrlPage());
//
//        return ResponseEntity.status(201).body(this.configCrawlerRepository.save(configCrawler));
//    }

    @PostMapping("/configCrawler/create")
    public ResponseEntity<ConfigCrawler> createConfigCrawler(@RequestBody ConfigCrawler configCrawler) {

        return ResponseEntity.ok(this.configCrawlerRepository.save(configCrawler));
    }

    @PostMapping("/configCrawler/update")
    public ResponseEntity updateConfigCrawler(@RequestBody ConfigCrawlerDto.RequestDto requestDto) {

        Optional<ConfigCrawler> configCrawler = this.configCrawlerRepository.findById(requestDto.getId());
        if(configCrawler.isPresent()) {

            configCrawler.get().setTitleQuery(requestDto.getTitleQuery());
//            configCrawler.get().setUrlPage(requestDto.getUrlPage());
//            configCrawler.get().setTitlePage(requestDto.getTitlePage());
            configCrawler.get().setTitleQuery(requestDto.getTitleQuery());
            configCrawler.get().setUrlQuery(requestDto.getUrlQuery());
            configCrawler.get().setDescriptionQuery(requestDto.getDescriptionQuery());
            configCrawler.get().setPriceQuery(requestDto.getPriceQuery());
            configCrawler.get().setImageUrlQuery(requestDto.getImageUrlQuery());
            configCrawler.get().setAcreageQuery(requestDto.getAcreageQuery());
            configCrawler.get().setAddressQuery(requestDto.getAddressQuery());
            configCrawler.get().setDirectionQuery(requestDto.getDirectionQuery());
            configCrawler.get().setDateQuery(requestDto.getDateQuery());
            configCrawler.get().setNameContactQuery(requestDto.getNameContactQuery());
            configCrawler.get().setPhoneContactQuery(requestDto.getPhoneContactQuery());
            configCrawler.get().setBedRoomQuery(requestDto.getBedRoomQuery());
            configCrawler.get().setBathRoomQuery(requestDto.getBathRoomQuery());
//            configCrawler.get().setUrlPage(requestDto.getUrlPage());

            this.configCrawlerRepository.save(configCrawler.get());
            Optional<ConfigCrawler> entity = this.configCrawlerRepository.findById(requestDto.getId());

            return ResponseEntity.ok(entity.get());
        } else {
            return ResponseEntity.ok("The product with id: " + requestDto.getId() + " was not found.");
        }

    }

    @GetMapping("/configCrawler/find/{configCrawlerId}")
    public ResponseEntity getUserById(@PathVariable String configCrawlerId) {

        Optional<ConfigCrawler> configCrawler = this.configCrawlerRepository.findById(configCrawlerId);

        if(configCrawler.isPresent()) {
            return ResponseEntity.ok(configCrawler.get());
        } else {
            return ResponseEntity.ok("The product with id: " + configCrawlerId + " was not found.");
        }
    }
    @GetMapping("/configCrawler/delete/{userId}")
    public ResponseEntity getUserById1(@PathVariable String userId) {

        Optional<ConfigCrawler> configCrawler = this.configCrawlerRepository.findById(userId);

        if(configCrawler.isPresent()) {
            this.configCrawlerRepository.deleteById(userId);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The user with id: " + userId + " was not delete.");
        }
    }
}
