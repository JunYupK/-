package com.ssafy.matdongsan.domain.account.api;

import com.ssafy.matdongsan.domain.account.dto.*;
import com.ssafy.matdongsan.domain.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "account", description = "account API")
public class AccountController {

    private final AccountService accountService;

    @Operation(summary = "Get account infos", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountResponse.class))
            })
    })
    @GetMapping
    public ResponseEntity<?> getAccount(@AuthenticationPrincipal String email) {
        log.info("email={}", email);
        AccountResponse accountResponse = accountService.getAccount(email);
        return ResponseEntity.ok().body(accountResponse);
    }

    @Operation(summary = "Get an account by id", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountResponse.class))
            })
    })
    @GetMapping("/{accountId}")
    public ResponseEntity<?> getAccount(@PathVariable Integer accountId) {
        log.info("id={}", accountId);
        AccountResponse accountResponse = accountService.getAccount(accountId);
        return ResponseEntity.ok().body(accountResponse);
    }

    @Operation(summary = "Update an account", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountResponse.class))
            })
    })
    @PutMapping
    public ResponseEntity<?> modifyAccount(@AuthenticationPrincipal String email, @RequestBody AccountModifyAllRequestDto dto) {
        log.info("email={}", email);
        log.info("dto={}", dto.toString());
        AccountResponse accountResponse = accountService.modifyAccount(dto, email);
        return ResponseEntity.ok().body(accountResponse);
    }

    @Operation(summary = "Update an account", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountResponse.class))
            })
    })
    @PutMapping("/step1")
    public ResponseEntity<?> modifyAccount(@AuthenticationPrincipal String email, @RequestBody AccountModifyStep1RequestDto dto) {
        log.info("email={}", email);
        log.info("dto={}", dto.toString());
        AccountResponse account = accountService.modifyAccount(dto, email);
        return ResponseEntity.ok().body(account);
    }

    @Operation(summary = "Update an account", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountResponse.class))
            })
    })
    @PutMapping("/step2")
    public ResponseEntity<?> modifyAccount(@AuthenticationPrincipal String email, @RequestBody AccountModifyStep2RequestDto dto) {
        log.info("email={}", email);
        log.info("dto={}", dto.toString());
        AccountResponse account = accountService.modifyAccount(dto, email);
        return ResponseEntity.ok().body(account);
    }

    @Operation(summary = "Save an account", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountResponse.class))
            })
    })
    @PostMapping
    public ResponseEntity<?> saveAccount(@RequestBody AccountSaveRequestDto dto) {
        log.info("Account={}", dto.toString());
        AccountResponse accountResponse = accountService.saveAccount(dto);
        return ResponseEntity.ok().body(accountResponse);
    }

    @Operation(summary = "Delete an account by id", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))
            })
    })
    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer accountId) {
        log.info("id={}", accountId);
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get a person tag", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = PersonTagResponse.class))
            })
    })
    @GetMapping("/tag")
    public ResponseEntity<?> getPersonTags(@AuthenticationPrincipal String email) {
        List<PersonTagResponse> personTags = accountService.getPersonTags(email);
        return ResponseEntity.ok().body(personTags);
    }

    @Operation(summary = "Create a person tag", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = PersonTagResponse.class))
            })
    })
    @PostMapping("/tag")
    public PersonTagResponse createPersonTag(@AuthenticationPrincipal String email, @RequestBody PersonTagSaveRequestDto dto) {
        log.info("email={}", email);
        log.info("dto={}", dto.toString());
        return accountService.savePersonTag(dto, email);
    }


    @Operation(summary = "retrieves the top 10 accounts sorted by the highest number of followers", tags = { "account" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AccountSimpleResponseDto.class))
            })
    })
    @GetMapping("/rank")
    public ResponseEntity<?> getAccountsTop10() {
        List<AccountSimpleResponseDto> dtos = accountService.getAccountsTop10();
        return ResponseEntity.ok().body(dtos);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchNickname(
            @RequestParam("query") String query
    ){
        List<AccountSearchResponseDto> dtos = accountService.searchNickname(query);
        return ResponseEntity.ok().body(dtos);
    }

    @Operation(summary = "Get a person tag by accountId")
    @GetMapping("/tag/{accountId}")
    public ResponseEntity<?> getPersonTagsById( @PathVariable("accountId") Integer accountId ) {
        List<PersonTagResponse> personTags = accountService.getPersonTagsById(accountId);
        return ResponseEntity.ok().body(personTags);
    }
}