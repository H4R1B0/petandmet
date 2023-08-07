package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.dto.animal.*;
import com.ssafy.petandmet.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class AnimalApiController {

    private final AnimalService animalService;

    @GetMapping("api/v1/animal/page")
    public Result findAll(@PageableDefault(size = 10) Pageable pageable) {
        Page<Animal> findAnimal = animalService.findAll(pageable);

        if(!findAnimal.isEmpty()) {
            List<FindAllAnimalResponse> response = findAnimal.stream()
                    .map(o -> new FindAllAnimalResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

    @GetMapping("api/v1/animal/search")
    public Result GetAnimalBySearch(@RequestParam Map<String, String> map) {

        List<Animal> findAnimal = animalService.findAnimalBySearch(map);

        if(!findAnimal.isEmpty()) {
            List<FindAnimalBySearchResponse> response = findAnimal.stream()
                    .map(o -> new FindAnimalBySearchResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

    @GetMapping("api/v1/animal")
    public Result GetAnimal(@RequestParam String uuid) {
        FindAnimalByIdResponse response = animalService.findOne(uuid);

        if (response != null) {
            return new Result(true, response, "null");
        }

        return new Result(false, "null", "null");
    }

    @DeleteMapping("api/v1/animal/{id}")
    public Result deleteAnimal(@PathVariable("id") String id) {
        String deleteId = animalService.delete(id);

        if (deleteId != null) {
            AnimalResponse response = new AnimalResponse("200", "동물 정보 삭제 성공");
            return new Result(true, response, "null");
        }
        AnimalResponse response = new AnimalResponse("500", "동물 정보 삭제 실패");
        return new Result(false, "null", "null");
    }

    @PostMapping("api/v1/animal")
    public Result createAnimal(@RequestBody CreateAnimalRequest request) {

        if (animalService.join(request)) {
            AnimalResponse response = new AnimalResponse("200", "강아지 정보 등록 성공");
            return new Result(true, response, "null");
        }
        AnimalResponse response = new AnimalResponse("500", "강아지 정보 등록 실패");
        return new Result(false, response, "null");
    }

    @PatchMapping("/api/v1/animal")
    public Result updateAnimal(@RequestBody UpdateAnimalRequest request) {
        if (animalService.update(request)) {
            UpdateAnimalResponse response = new UpdateAnimalResponse("200", "강아지 정보 수정 성공");
            return new Result(true, response, "null");
        }
        UpdateAnimalResponse response = new UpdateAnimalResponse("500", "강아지 정보 수정 성공");
        return new Result(false, response, "null");
    }

    @GetMapping("/api/v1/animal/page-count")
    public Result getPageCount(@RequestParam("center_uuid") String uuid, @RequestParam Long size) {
        Long findPageCount = animalService.findPageCount(uuid, size);

        PageCountResponse response = new PageCountResponse(findPageCount);
        return new Result(true, response, "null");
    }
}