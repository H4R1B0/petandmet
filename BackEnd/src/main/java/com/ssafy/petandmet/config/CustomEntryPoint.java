package com.ssafy.petandmet.config;

import com.github.dockerjava.zerodep.shaded.org.apache.hc.core5.http.HttpStatus;
import com.ssafy.petandmet.dto.jwt.ErrorDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CustomEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        List<ErrorDto> errors = new ArrayList<>();
        errors.add(ErrorDto.builder().point("ACCESS TOKEN / REFRESH TOKEN").detail("The token has expired.").build());

        ProblemDetail pb = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(HttpStatus.SC_FORBIDDEN), "FORBIDDEN");
//        pb.setType(URI.create("/docs.html"));
        pb.setProperty("errors", errors);
        pb.setInstance(URI.create(request.getRequestURI()));
        ObjectMapper objectMapper = new ObjectMapper();

        PrintWriter writer = response.getWriter();
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
        writer.write(objectMapper.writeValueAsString(pb));
    }
}