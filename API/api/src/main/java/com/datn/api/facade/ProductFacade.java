package com.datn.api.facade;

import com.datn.api.dto.ProductDto;
import lombok.Setter;


public interface ProductFacade {
    public ProductDto.ResponseDto findProductById(String id);
}
