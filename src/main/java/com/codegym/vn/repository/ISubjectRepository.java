package com.codegym.vn.repository;

import com.codegym.vn.model.Subject;
import com.codegym.vn.model.Teacher;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ISubjectRepository extends PagingAndSortingRepository<Subject, Long> {
    Iterable<Subject> findAllByNameContaining(String name);
}
