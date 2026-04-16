package com.datn.api.service;

import com.datn.api.dto.SearchDto;
import com.datn.api.model.Posts;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PostsSearchService {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Search posts with optional filters.
     * - title, province, direct: case-insensitive regex
     * - price: stored as integer VND String (e.g. "1500000000" = 1.5 tỷ)
     *          minPrice from UI is in tỷ → converted to VND before comparing
     * - square: stored as float m² String (e.g. "92.0")
     *          minSquare from UI is in m²
     * Uses MongoDB $expr + $convert to safely parse numeric strings.
     */
    public Page<Posts> search(SearchDto dto, Pageable pageable) {
        List<Document> andClauses = new ArrayList<>();

        // Filter by title (case-insensitive regex)
        if (dto.getTitle() != null && !dto.getTitle().isBlank()) {
            andClauses.add(new Document("title",
                    new Document("$regex", dto.getTitle()).append("$options", "i")));
        }

        // Filter by province (case-insensitive regex)
        if (dto.getProvince() != null && !dto.getProvince().isBlank()) {
            andClauses.add(new Document("province",
                    new Document("$regex", dto.getProvince()).append("$options", "i")));
        }

        // Filter by direct (case-insensitive regex)
        if (dto.getDirect() != null && !dto.getDirect().isBlank()) {
            andClauses.add(new Document("direct",
                    new Document("$regex", dto.getDirect()).append("$options", "i")));
        }

        // Filter by minimum price
        // UI value is in tỷ (e.g. 1.5 tỷ) → convert to VND (1,500,000,000)
        if (dto.getMinPrice() != null && dto.getMinPrice() > 0) {
            double minPriceVND = dto.getMinPrice() * 1_000_000_000.0;
            andClauses.add(new Document("$expr",
                    new Document("$gte", Arrays.asList(
                            new Document("$convert", new Document("input", "$price")
                                    .append("to", "double")
                                    .append("onError", -1.0)
                                    .append("onNull", -1.0)),
                            minPriceVND
                    ))));
        }

        // Filter by maximum price
        if (dto.getMaxPrice() != null && dto.getMaxPrice() > 0) {
            double maxPriceVND = dto.getMaxPrice() * 1_000_000_000.0;
            andClauses.add(new Document("$expr",
                    new Document("$lte", Arrays.asList(
                            new Document("$convert", new Document("input", "$price")
                                    .append("to", "double")
                                    .append("onError", -1.0)
                                    .append("onNull", -1.0)),
                            maxPriceVND
                    ))));
        }

        // Filter by minimum square (m²)
        // UI value is already in m² (e.g. 50)
        if (dto.getMinSquare() != null && dto.getMinSquare() > 0) {
            andClauses.add(new Document("$expr",
                    new Document("$gte", Arrays.asList(
                            new Document("$convert", new Document("input", "$square")
                                    .append("to", "double")
                                    .append("onError", -1.0)
                                    .append("onNull", -1.0)),
                            dto.getMinSquare()
                    ))));
        }

        // Filter by maximum square (m²)
        if (dto.getMaxSquare() != null && dto.getMaxSquare() > 0) {
            andClauses.add(new Document("$expr",
                    new Document("$lte", Arrays.asList(
                            new Document("$convert", new Document("input", "$square")
                                    .append("to", "double")
                                    .append("onError", -1.0)
                                    .append("onNull", -1.0)),
                            dto.getMaxSquare()
                    ))));
        }

        Document queryDoc = andClauses.isEmpty()
                ? new Document()
                : new Document("$and", andClauses);

        // Count total matching documents
        Query countQuery = new BasicQuery(queryDoc);
        long total = mongoTemplate.count(countQuery, Posts.class);

        // Fetch paginated results
        Query query = new BasicQuery(queryDoc);
        query.with(pageable);
        List<Posts> posts = mongoTemplate.find(query, Posts.class);

        return new PageImpl<>(posts, pageable, total);
    }
}
