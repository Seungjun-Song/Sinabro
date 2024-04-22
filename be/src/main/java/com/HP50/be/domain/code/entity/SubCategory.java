package com.HP50.be.domain.code.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subCategoryId;

    @Column(length = 50)
    private String subCategoryName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
