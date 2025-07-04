package hr.algebra.socialnetwork.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthenticationRequest {
  @NotBlank(message = "Email must not be blank")
  @Email(message = "Invalid email format")
  String email;

  @NotBlank(message = "Password must not be blank")
  String password;
}
;
