package com.chefsphere.ums.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CreatorResponseDTO;
import com.chefsphere.ums.dto.UserResponseDTO;
import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.entities.UserType;
import com.chefsphere.ums.exception_handler.EmailAlreadyExistsException;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.NoUniqueDataException;
import com.chefsphere.ums.exception_handler.UserNameAlreadyExistsException;
import com.chefsphere.ums.exception_handler.UserNotFoundException;
import com.chefsphere.ums.repository.UserRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	// dependencies
	private final FoodieService foodieService;
	private final CreatorService creatorService;
	private final AuthService authService;
	private final UserRepo userRepo;
	private final ModelMapper modelMapper;
	private final JwtUtils jwtUtils;

	public User createUser(Integer i, UserSignUpDto dto) {
		User newUser = modelMapper.map(dto, User.class);
		// 0 - Admin
		// 1 - Creator
		// 2 - Foodie
		if (userNameExist(dto.getUsername())) {
			throw new UserNameAlreadyExistsException("Username should be unique");
		}
		if (userEmailExist(dto.getEmail())) {
			throw new EmailAlreadyExistsException("Email address should be unique");
		}
		newUser.setType(UserType.values()[i]);
		authService.encryptPassword(newUser);
		return userRepo.save(newUser);
	}

	public String updateUserDetails(HttpServletRequest req, UserUpdateDto dto) {

		Long uid = jwtUtils.extractUidFromReq(req);

		User u = userRepo.findByIdAndIsActiveTrue(uid).get();

		String str = "";

		if (dto.getEmail() != null) {
			u.setEmail(dto.getEmail());
			str += " email,";
		}
		if (dto.getFirstName() != null) {
			u.setFirstName(dto.getFirstName());
			str += " firstname,";
		}
		if (dto.getGender() != null) {
			u.setGender(dto.getGender());
			str += " gender,";
		}
		if (dto.getLastName() != null) {
			u.setLastName(dto.getLastName());
			str += " lastname,";
		}
		if (dto.getUsername() != null) {
			u.setUsername(dto.getUsername());
			str += " username,";
		}

		if (dto.getDescription() != null) {
			u.setDescription(dto.getDescription());
			str += " description,";
		}

		updateUser(u);

		if (str.length() > 0) {
			return "Updated " + str.substring(0, str.length() - 1);
		} else {
			throw new NoUniqueDataException("No distint credentials were provided");
		}

	}

	@Override
	public String updateUserDetails(User u, UserUpdateDto dto) {
		String str = "";

		if (dto.getEmail() != null) {
			u.setEmail(dto.getEmail());
			str += " email,";
		}
		if (dto.getFirstName() != null) {
			u.setFirstName(dto.getFirstName());
			str += " firstname,";
		}
		if (dto.getGender() != null) {
			u.setGender(dto.getGender());
			str += " gender,";
		}
		if (dto.getLastName() != null) {
			u.setLastName(dto.getLastName());
			str += " lastname,";
		}
		if (dto.getUsername() != null) {
			u.setUsername(dto.getUsername());
			str += " username,";
		}

		if (dto.getDescription() != null) {
			u.setDescription(dto.getDescription());
			str += " description,";
		}

		updateUser(u);

		if (str.length() > 0) {
			return "Updated " + str.substring(0, str.length() - 1);
		} else {
			throw new NoUniqueDataException("No distint credentials were provided");
		}

	}

	@Override
	public String updateUserDetails(Long uid, UserUpdateDto dto) {

		User u = userRepo.findById(uid).orElseThrow(() -> new InvalidIdException("User not found for id:" + uid));

		String str = "";

		if (dto.getEmail() != null) {
			u.setEmail(dto.getEmail());
			str += " email,";
		}
		if (dto.getFirstName() != null) {
			u.setFirstName(dto.getFirstName());
			str += " firstname,";
		}
		if (dto.getGender() != null) {
			u.setGender(dto.getGender());
			str += " gender,";
		}
		if (dto.getLastName() != null) {
			u.setLastName(dto.getLastName());
			str += " lastname,";
		}
		if (dto.getUsername() != null) {
			u.setUsername(dto.getUsername());
			str += " username,";
		}

		if (dto.getDescription() != null) {
			u.setDescription(dto.getDescription());
			str += " description,";
		}
		updateUser(u);

		if (str.length() > 0) {
			return "Updated " + str.substring(0, str.length() - 1);
		} else {
			throw new NoUniqueDataException("No distint credentials were provided");
		}

	}

	@Override
	public void updateUser(User changeUser) {
		// save user to db through userRepository
		userRepo.save(changeUser);

	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findByEmailAndIsActiveTrue(email).get();

	}

	@Override
	public User findById(Long id) {
		Optional<User> u = userRepo.findByIdAndIsActiveTrue(id);
		if (u.isEmpty()) {
			throw new UserNotFoundException("Invalid user id" + id);
		}
		return u.get();
	}

	@Override
	public boolean userNameExist(String userName) {
		return userRepo.existsByUsernameAndIsActiveTrue(userName);
	}

	@Override
	public boolean userEmailExist(String email) {
		return userRepo.existsByEmailAndIsActiveTrue(email);
	}

	@Override
	public String deleteFoodie(HttpServletRequest req) {
		// validate if foodie
		Foodie f = foodieService.findById(req);
		User user = f.getUserId();
		user.setActive(false);
		userRepo.save(user);
		return "User " + user.getUsername() + " deleted succesfully";
	}

	@Override
	public String deleteCreator(User user) {
		user.setActive(false);
		userRepo.save(user);
		return "User " + user.getUsername() + " deleted succesfully";
	}

	@Override
	public String deleteCreator(Long id) {
		// validate if foodie
		CreatorResponseDTO c = creatorService.findById(id);
		User user = userRepo.findById(c.getUid()).get();
		user.setActive(false);
		userRepo.save(user);
		return "User " + user.getUsername() + " deleted succesfully";
	}

	@Override
	@Transactional
	public void deleteUserHard(Long id) {
		if (userRepo.existsById(id)) {
			userRepo.deleteById(id);
		} else {
			throw new InvalidIdException("No user by id: " + id);
		}
	}

	@Override
	public String deleteCreator(HttpServletRequest req) {
		Long uid = jwtUtils.extractUidFromReq(req);

		User user = userRepo.findByIdAndIsActiveTrue(uid).get();
		user.setActive(false);
		userRepo.save(user);
		return "User " + user.getUsername() + " deleted succesfully";
	}

	@Override
	public String deleteFoodie(Long id) {
		// validate if foodie
		Foodie f = foodieService.findById(id);
		User user = f.getUserId();
		user.setActive(false);
		userRepo.save(user);
		return "User " + user.getUsername() + " deleted succesfully";
	}

	@Override
	public UserResponseDTO userDetails(HttpServletRequest req) {
		Long uid = jwtUtils.extractUidFromReq(req);
		return userRepo.findByIdAndIsActiveTrue(uid).map(s -> modelMapper.map(s, UserResponseDTO.class))
				.orElseThrow(() -> new UserNotFoundException("Invalid user id" + uid));
	}

	@Override
	public UserResponseDTO userDetails(Long uid) {
		return userRepo.findByIdAndIsActiveTrue(uid).map(s -> modelMapper.map(s, UserResponseDTO.class))
				.orElseThrow(() -> new UserNotFoundException("Invalid user id" + uid));
	}
}