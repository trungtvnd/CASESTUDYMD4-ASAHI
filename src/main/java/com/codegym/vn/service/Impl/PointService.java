package com.codegym.vn.service.Impl;

import com.codegym.vn.model.Point;
import com.codegym.vn.repository.IPointRepository;
import com.codegym.vn.service.interfaceImpl.IPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class PointService implements IPointService {

    @Autowired
    IPointRepository pointRepository;

    @Override
    public Optional<Point> findByStudent(Long aLong) {
        return pointRepository.findByStudent(aLong);
    }
}
