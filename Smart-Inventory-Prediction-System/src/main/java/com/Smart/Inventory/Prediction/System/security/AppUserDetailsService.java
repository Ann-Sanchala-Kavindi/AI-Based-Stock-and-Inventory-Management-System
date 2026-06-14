package com.Smart.Inventory.Prediction.System.security;

import com.Smart.Inventory.Prediction.System.model.User;
import com.Smart.Inventory.Prediction.System.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("authentication user with username [{}]", username);

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("No user found with username [" + username + "]")
        );

        // ADD THIS - to see exactly what's coming from DB
        System.out.println("Authorities from DB: " + user.getAuthorities());
        user.getAuthorities().forEach(a -> System.out.println("Authority: " + a.getAuthority()));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getAuthorities().stream()
                        .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                        .toList())
                .build();
    }






}
