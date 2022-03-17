package com.codegym.vn.repository;

import com.codegym.vn.model.Student;
import com.codegym.vn.model.Teacher;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudentRepository extends PagingAndSortingRepository<Student, Long> {
    Iterable<Student> findAllByNameContaining(String name);
}
