package com.codegym.vn.controller.admin;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

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
