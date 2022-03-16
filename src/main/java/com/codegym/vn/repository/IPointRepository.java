package com.codegym.vn.repository;

import com.codegym.vn.model.Point;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IPointRepository extends PagingAndSortingRepository<Point, Long> {
    Optional<Point> findByStudent(Long aLong);
}
