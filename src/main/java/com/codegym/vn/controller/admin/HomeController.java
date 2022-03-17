package com.codegym.vn.controller.admin;


import com.codegym.vn.model.AppUser;
import com.codegym.vn.model.Student;
import com.codegym.vn.service.interfaceImpl.IAppUserService;
import com.codegym.vn.service.interfaceImpl.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
public class HomeController {
    @Autowired
    private IAppUserService iAppUserService;
    @Autowired
    private IStudentService iStudentService;

    private String getPrincipal() {
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }
    @GetMapping("/home")
    public String home(){
        return "/template-view/index";
    }

    @GetMapping("/teacher")
    public String user(Model model){
        model.addAttribute("user", getPrincipal());
        return "/template-home/user";
    }
    @GetMapping("/students")
    public ModelAndView students(){
        ModelAndView modelAndView = new ModelAndView("student-home");
        Optional<AppUser> appUser = iAppUserService.findByUsername(getPrincipal());
        Optional<Student> student = iStudentService.findStudentByAppUserId(appUser.get().getId());
        modelAndView.addObject("user", getPrincipal());
        modelAndView.addObject("userStudent", student);
        return modelAndView;
    }

    @GetMapping("/admin")
    public String admin(Model model){
        model.addAttribute("user", getPrincipal());
        return "/admin-home1";
    }

    @GetMapping("/accessDenied")
    public String accessDeniedPage(ModelMap model) {
        model.addAttribute("user", getPrincipal());
        return "/template-home/access-denied";
    }


}
