package com.codegym.vn.repository;

import com.codegym.vn.model.Classes;
import com.codegym.vn.model.Role;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface IClassesRepository extends PagingAndSortingRepository<Classes, Long> {
    Classes findByName(String name);
    Iterable<Classes> findAllByNameContaining(String name);
}
