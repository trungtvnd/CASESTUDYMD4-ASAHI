package com.codegym.vn.repository;


import com.codegym.vn.model.AppUser;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IAppUserRepository extends PagingAndSortingRepository<AppUser,Long> {
    AppUser findByUsername(String username);
    Iterable<AppUser> findAllByUsernameContaining(String username);

}
