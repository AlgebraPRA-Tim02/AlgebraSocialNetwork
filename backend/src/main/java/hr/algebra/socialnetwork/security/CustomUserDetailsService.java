package hr.algebra.socialnetwork.security;

import hr.algebra.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepo;

  @Override
  public UserDetails loadUserByUsername(String email) {
    return userRepo
        .findByEmail(email)
        .orElseThrow(
            () ->
                new UsernameNotFoundException("User with email [%s] not found! ".formatted(email)));
  }
}
