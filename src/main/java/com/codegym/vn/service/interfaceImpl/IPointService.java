package com.codegym.vn.service.interfaceImpl;

import com.codegym.vn.model.Point;

import java.util.Optional;

public interface IPointService {
    Optional<Point> findByStudent(Long aLong);
}
