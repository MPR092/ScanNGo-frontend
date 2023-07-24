import React, { useState } from "react";

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
  
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
      }
    };
  
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
  };

  export const useTogglePasswordVisibility1 = () => {
    const [passwordVisibility1, setPasswordVisibility1] = useState(true);
    const [rightIcon1, setRightIcon1] = useState('eye');
  
    const handlePasswordVisibility1 = () => {
      if (rightIcon1 === 'eye') {
        setRightIcon1('eye-off');
        setPasswordVisibility1(!passwordVisibility1);
      } else if (rightIcon1 === 'eye-off') {
        setRightIcon1('eye');
        setPasswordVisibility1(!passwordVisibility1);
      }
    };
  
    return {
      passwordVisibility1,
      rightIcon1,
      handlePasswordVisibility1
    };
  };