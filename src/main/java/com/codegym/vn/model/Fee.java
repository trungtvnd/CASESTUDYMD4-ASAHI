package com.codegym.vn.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Fee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToOne
    private Student student;

}
