package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.dto.animal.FindAnimalBySearchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, String> {

    @Query("select a from Animal a where a.name = :name")
    List<Animal> findByName(String name);

    @Query("SELECT new com.ssafy.petandmet.dto.animal.FindAnimalBySearchResponse" +
            "(a.name, a.age, a.specie, a.breed, a.findPlace, a.center.uuid, a.enterDate, a.adoptionStatus, a.adoptionStartDate, a.gender, a.enterAge, a.noticeDate, a.characterType)" +
            " FROM Animal a where (:name is null or a.name = :name) and (:specie is null or a.specie = :specie) and (:breed is null or a.breed = :breed)")
    Page<FindAnimalBySearchResponse> findAnimalBySearch(String name, String specie, String breed, Pageable pageable);

    @Query("select count(a) from Animal a where a.center.uuid = :uuid")
    Long findTotalCount(String uuid);
}
