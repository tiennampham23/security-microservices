package com.ecommerce.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.model.UserModel;
import com.ecommerce.repository.RoleRepository;
import com.ecommerce.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		// hard coding the users. All passwords must be encoded.
		List<UserModel> listUsers = this.userRepository.findAll();
		for (UserModel appUser : listUsers) {
			if (appUser.getUsername().equals(username)) {

				// Remember that Spring needs roles to be in this format: "ROLE_" + userRole
				// (i.e. "ROLE_ADMIN")
				// So, we need to set it to that format, so we can verify and compare roles
				// (i.e. hasRole("ADMIN")).
				String role = roleRepository.findById(appUser.getRoleId()).map(user -> user.getRoleName()).orElse(null);
				List<GrantedAuthority> grantedAuthorities = AuthorityUtils
						.commaSeparatedStringToAuthorityList("ROLE_" + role.toUpperCase());

				// The "User" class is provided by Spring and represents a model class for user
				// to be returned by UserDetailsService
				// And used by auth manager to verify and check user authentication.
				return new User(appUser.getUsername(), appUser.getPasswordHash(), grantedAuthorities);
			}
		}
		// If user not found. Throw this exception.
		throw new UsernameNotFoundException("Username: " + username + " not found");
	}
}