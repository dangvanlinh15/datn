package com.datn.api.facade;

import com.datn.api.dto.ProductDto;
import com.datn.api.model.Product;
import com.datn.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ProductFaceImpl implements ProductFacade  {

    private final ProductRepository productRepository;
    public ProductFaceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
//    public ProductFaceImpl(ProductRepository productRepository) {
//        this.productRepository = productRepository;
//    }
    public ProductDto.ResponseDto findProductById(String id){


        Optional<Product> product = productRepository.findById(id);
        ProductDto.ResponseDto res = new ProductDto.ResponseDto();
        if(product.isPresent()) {

            res.setId(product.get().getId());
            res.setName(product.get().getName());
            res.setDescription(product.get().getDescription());
            return res;
        }
        return  res;
    }
}
