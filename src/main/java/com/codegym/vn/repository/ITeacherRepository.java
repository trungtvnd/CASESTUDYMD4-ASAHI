package com.codegym.vn.repository;

import com.codegym.vn.model.Teacher;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITeacherRepository extends PagingAndSortingRepository<Teacher,Long> {
    Iterable<Teacher> findAllByNameContaining(String name);
}
