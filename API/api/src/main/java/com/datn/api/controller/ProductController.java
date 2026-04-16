package com.datn.api.controller;

import com.datn.api.dto.ProductDto;
import com.datn.api.facade.ProductFacade;
import com.datn.api.facade.ProductFaceImpl;
import com.datn.api.model.Product;
import com.datn.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired
    private ProductFacade productFacade;
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(this.productRepository.findAll());
    }

    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto.RequestDto requestDto) {

        Product product = new Product();
        product.setName(requestDto.getName());
        product.setDescription(requestDto.getDescription());

        return ResponseEntity.status(200).body(this.productRepository.save(product));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity getProductById(@PathVariable String id) {

        ProductDto dto = new ProductDto();
        ProductDto.ResponseDto res = productFacade.findProductById(id);
        return ResponseEntity.status(201).body(res);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity deleteProductById(@PathVariable String id) {

        Optional<Product> product = this.productRepository.findById(id);

        if(product.isPresent()) {
            this.productRepository.deleteById(id);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The product with id: " + id + " was not found.");
        }
    }
}
