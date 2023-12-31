package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Animal;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindAnimalBySearchResponse {
    private String uuid;
    private String name;
    private int age;
    private String specie;
    private String breed;
    private String findPlace;
    private String centerUuid;
    private LocalDateTime enteredDate;

    private AdoptionStatus adoptionStatus;
    private LocalDateTime adoptionStartDate;
    private Gender gender;
    private int enterAge;
    private String noticeDate;

    private CharacterType character;
    @JsonProperty("animal_photo_url")
    private String photoUrl;

    public FindAnimalBySearchResponse(Animal animal) {
        this.uuid = animal.getUuid();
        this.name = animal.getName();
        this.age = animal.getAge();
        this.specie = animal.getSpecie();
        this.breed = animal.getBreed();
        this.findPlace = animal.getFindPlace();
        if (animal.getCenter() != null) {
            this.centerUuid = animal.getCenter().getUuid();
        }
        this.enteredDate = animal.getEnterDate();
        this.adoptionStatus = animal.getAdoptionStatus();
        this.adoptionStartDate = animal.getAdoptionStartDate();
        this.gender = animal.getGender();
        this.enterAge = animal.getEnterAge();
        this.noticeDate = animal.getNoticeDate();
        this.character = animal.getCharacterType();
        this.photoUrl = animal.getPhotoUrl();
    }
}
