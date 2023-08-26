package com.ssafy.petandmet.dao;

import com.ssafy.petandmet.dto.animal.CreateAnimalRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class AnimalDao {

    private final RedisTemplate<String, Object> redisTemplate;

    public void addAnimal(CreateAnimalRequest animalDto, String animalId){
        String key = KeyGen.cartKeyGenerate(animalId);

        redisTemplate.watch(key); // 해당 키를 감시한다. 변경되면 로직 취소.

        try {
            redisTemplate.multi();

            redisTemplate.opsForValue().set(key, animalDto);
            redisTemplate.expire(key, 60, TimeUnit.MINUTES);

        } catch (Exception e) {
            redisTemplate.discard();
            throw new RuntimeException(
                    "Cannot add animal token. key : " + key + ", ERROR Info " + e.getMessage());
        }
    }

    public CreateAnimalRequest findByAnimalId(String animalId){
        String key = KeyGen.cartKeyGenerate(animalId);

        redisTemplate.watch(key); // 해당 키를 감시한다. 변경되면 로직 취소.

        redisTemplate.multi();

        CreateAnimalRequest response = (CreateAnimalRequest) redisTemplate.opsForValue().get(key);

        return response;


    }

    static class KeyGen {
        private static final String CART_KEY = "animal";

        public static String cartKeyGenerate(String memberId){
            return CART_KEY + ":" + memberId;
        }
    }
}