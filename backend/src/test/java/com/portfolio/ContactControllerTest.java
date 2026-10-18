package com.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.controller.ContactController;
import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactRequest;
import com.portfolio.service.ContactService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactService contactService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/contact/health should return UP status")
    void shouldReturnHealthStatusUp() throws Exception {
        mockMvc.perform(get("/api/contact/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }

    @Test
    @DisplayName("POST /api/contact with valid data should return 201 Created")
    void shouldAcceptValidContactSubmission() throws Exception {
        ContactRequest request = new ContactRequest(
                "John Doe",
                "john.doe@example.com",
                "Interview Invitation",
                "Hello Rohith, we would like to interview you for a Java developer role.",
                ""
        );

        when(contactService.processContact(any(ContactRequest.class), anyString()))
                .thenReturn(ApiResponse.ok("Thank you! Your message has been received and saved successfully."));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    @DisplayName("POST /api/contact with invalid email should return 400 Bad Request")
    void shouldRejectInvalidEmail() throws Exception {
        ContactRequest request = new ContactRequest(
                "John Doe",
                "not-an-email",
                "Interview Invitation",
                "Hello Rohith, we would like to interview you.",
                ""
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.fieldErrors.senderEmail").isNotEmpty());
    }

    @Test
    @DisplayName("POST /api/contact with blank message should return 400 Bad Request")
    void shouldRejectBlankMessage() throws Exception {
        ContactRequest request = new ContactRequest(
                "John Doe",
                "john.doe@example.com",
                "Subject",
                "",
                ""
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.fieldErrors.message").isNotEmpty());
    }
}
